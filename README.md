# rate-proxy

A rate-limited HTTP reverse proxy with concurrency control. Built on top of [@cat5th/pool.js](https://github.com/harvey-woo/pool.js).

## Install

```bash
npm install -g @cat5th/rate-proxy
```

## Usage

```bash
TARGET=<target_url> [PORT=9999] [CONCURRENCY=5] [TIMEOUT=120000] rate-proxy
```

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `TARGET` | (required) | Upstream server URL |
| `PORT` | `9999` | Local port |
| `CONCURRENCY` | `5` | Max concurrent upstream requests |
| `TIMEOUT` | `120000` | Request timeout (ms) |

### Examples

```bash
# Basic
TARGET=http://api.example.com rate-proxy

# Custom concurrency
TARGET=http://api.example.com CONCURRENCY=2 rate-proxy

# Via npx
TARGET=http://api.example.com npx @cat5th/rate-proxy
```

```bash
# Access the proxy
curl http://localhost:9999/some/path
```

## License

MIT
