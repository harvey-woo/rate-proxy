# ⚡ rate-proxy

[![npm version](https://img.shields.io/npm/v/@cat5th/rate-proxy.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/rate-proxy)
[![npm version](https://img.shields.io/npm/l/@cat5th/rate-proxy.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/rate-proxy)
[![npm downloads](https://img.shields.io/npm/dt/@cat5th/rate-proxy.svg?style=flat-square)](https://www.npmjs.com/package/@cat5th/rate-proxy)
[![Build Status](https://github.com/harvey-woo/rate-proxy/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/harvey-woo/rate-proxy/actions/workflows/npm-publish.yml)

A rate-limited HTTP reverse proxy with concurrency control.
Built on top of [@cat5th/pool.js](https://github.com/harvey-woo/pool.js).

## Install

```bash
npm install -g @cat5th/rate-proxy
```

or use with npx:

```bash
npx @cat5th/rate-proxy
```

## Usage

```bash
TARGET=<target_url> [PORT=8080] [CONCURRENCY=5] [TIMEOUT=120000] rate-proxy
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `TARGET` | (required) | The upstream server URL to proxy to |
| `PORT` | `8080` | Local port to listen on |
| `CONCURRENCY` | `5` | Maximum concurrent upstream requests |
| `TIMEOUT` | `120000` | Request timeout in milliseconds |

### Examples

**Basic:**

```bash
TARGET=http://api.example.com rate-proxy
```

**Custom concurrency:**

```bash
TARGET=http://api.example.com CONCURRENCY=2 rate-proxy
```

**Via npx (no install):**

```bash
TARGET=http://api.example.com npx @cat5th/rate-proxy
```

**With timeout:**

```bash
TARGET=http://api.example.com TIMEOUT=30000 rate-proxy
```

Then access the proxy:

```bash
curl http://localhost:8080/some/path
```

## How it works

rate-proxy uses a resource pool ([@cat5th/pool.js](https://github.com/harvey-woo/pool.js)) to limit concurrent connections to the upstream server. When the concurrency limit is reached, new requests wait until an existing request completes. This prevents overwhelming the target server while maintaining fairness.

```
Client ──→ [rate-proxy] ──→ Upstream Server
                    │
             Concurrency: 2  ← limit
                    │
            ┌─── request 1 ───┐
            └─── request 2 ───┘
            ┌─── request 3 ───┐  ← queued
            └─── request 4 ───┘  ← queued
```

## Use Cases

- **API rate limiting** — Protect upstream APIs from being overwhelmed
- **LLM proxy** — Limit concurrent calls to AI model APIs (e.g. OpenAI, DashScope)
- **Scraping** — Control request rate to avoid getting banned
- **Load testing** — Constrain concurrent connections to a target

## License

MIT
