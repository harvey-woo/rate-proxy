#!/usr/bin/env node

// src/bin.ts
import { createServer, METHODS } from "http";
import { Pool } from "@cat5th/pool.js";
var TARGET = process.env.TARGET;
if (!TARGET) {
  console.error("Usage: TARGET=<url> [PORT=8080] [CONCURRENCY=5] npx @cat5th/rate-proxy");
  process.exit(1);
}
var PORT = parseInt(process.env.PORT || "8080", 10);
var CONCURRENCY = parseInt(process.env.CONCURRENCY || "5", 10);
var TIMEOUT = parseInt(process.env.TIMEOUT || "120000", 10);
var targetBase = TARGET.replace(/\/+$/, "");
var pool = new Pool(CONCURRENCY);
var scheduler = pool.schedule();
var METHODS_WITH_BODY = new Set(METHODS.filter((m) => m !== "GET" && m !== "HEAD"));
async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
var FORWARD_HEADERS_BLOCKLIST = /* @__PURE__ */ new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "upgrade"
]);
function collectHeaders(req) {
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (FORWARD_HEADERS_BLOCKLIST.has(key)) continue;
    if (value !== void 0) {
      headers[key] = Array.isArray(value) ? value.join(", ") : value;
    }
  }
  return headers;
}
function log(prefix, msg, ...args) {
  const ts = (/* @__PURE__ */ new Date()).toISOString().slice(11, 23);
  console.log(`${ts} [${prefix}] ${msg}`, ...args);
}
var server = createServer(async (req, res) => {
  const path = req.url || "/";
  const method = req.method || "GET";
  log("\u2192", `${method} ${path}`);
  try {
    const body = METHODS_WITH_BODY.has(method) ? await readBody(req) : void 0;
    await scheduler.enqueue(async function() {
      const url = `${targetBase}${path}`;
      const headers = collectHeaders(req);
      log("\u2191", `${method} ${url}`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: controller.signal
        });
        const status = response.status;
        const respHeaders = Object.fromEntries(response.headers);
        res.writeHead(status, respHeaders);
        if (response.body) {
          const reader = response.body.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            res.write(value);
          }
        }
        res.end();
        log("\u2713", `${method} ${path} ${status}`);
      } finally {
        clearTimeout(timer);
      }
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      if (!res.headersSent) {
        res.writeHead(504, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "upstream timeout" }));
      } else {
        res.end();
      }
    } else {
      if (!res.headersSent) {
        res.writeHead(502, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      } else {
        res.end();
      }
    }
    log("\u2717", `${method} ${path}: ${err.message}`);
  }
});
server.listen(PORT, () => {
  console.log(`\u2500\u2500 rate-proxy \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`);
  console.log(`   listen : ${PORT}`);
  console.log(`   target : ${targetBase}`);
  console.log(`   concurrency : ${CONCURRENCY}`);
  console.log(`   timeout : ${TIMEOUT}ms`);
  console.log(`\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500`);
});
