import { createServer, IncomingMessage, METHODS } from 'node:http'
import { Pool } from '@cat5th/pool.js'

const TARGET = process.env.TARGET
if (!TARGET) {
  console.error('Usage: TARGET=<url> [PORT=8080] [CONCURRENCY=5] npx @cat5th/rate-proxy')
  process.exit(1)
}

const PORT = parseInt(process.env.PORT || '8080', 10)
const CONCURRENCY = parseInt(process.env.CONCURRENCY || '5', 10)
const TIMEOUT = parseInt(process.env.TIMEOUT || '120000', 10)

const targetBase = TARGET.replace(/\/+$/, '')
const pool = new Pool(CONCURRENCY)
const scheduler = pool.schedule()

const METHODS_WITH_BODY = new Set(METHODS.filter((m) => m !== 'GET' && m !== 'HEAD'))

async function readBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

const FORWARD_HEADERS_BLOCKLIST = new Set([
  'host', 'connection', 'content-length', 'transfer-encoding',
  'keep-alive', 'proxy-authenticate', 'proxy-authorization',
  'te', 'trailer', 'upgrade',
])

function collectHeaders(req: IncomingMessage): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (FORWARD_HEADERS_BLOCKLIST.has(key)) continue
    if (value !== undefined) {
      headers[key] = Array.isArray(value) ? value.join(', ') : value
    }
  }
  return headers
}

function log(prefix: string, msg: string, ...args: unknown[]) {
  const ts = new Date().toISOString().slice(11, 23)
  console.log(`${ts} [${prefix}] ${msg}`, ...args)
}

const server = createServer(async (req, res) => {
  const path = req.url || '/'
  const method = req.method || 'GET'

  log('→', `${method} ${path}`)

  try {
    const body = METHODS_WITH_BODY.has(method) ? await readBody(req) : undefined

    await scheduler.enqueue(async function () {
      const url = `${targetBase}${path}`
      const headers = collectHeaders(req)

      log('↑', `${method} ${url}`)

      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), TIMEOUT)

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: controller.signal,
        })

        const status = response.status
        const respHeaders = Object.fromEntries(response.headers)

        res.writeHead(status, respHeaders)

        if (response.body) {
          const reader = response.body.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            res.write(value)
          }
        }
        res.end()

        log('✓', `${method} ${path} ${status}`)
      } finally {
        clearTimeout(timer)
      }
    })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      if (!res.headersSent) {
        res.writeHead(504, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: 'upstream timeout' }))
      } else {
        res.end()
      }
    } else {
      if (!res.headersSent) {
        res.writeHead(502, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: (err as Error).message }))
      } else {
        res.end()
      }
    }
    log('✗', `${method} ${path}: ${(err as Error).message}`)
  }
})

server.listen(PORT, () => {
  console.log(`── rate-proxy ──────────────────────`)
  console.log(`   listen : ${PORT}`)
  console.log(`   target : ${targetBase}`)
  console.log(`   concurrency : ${CONCURRENCY}`)
  console.log(`   timeout : ${TIMEOUT}ms`)
  console.log(`──────────────────────────────────`)
})
