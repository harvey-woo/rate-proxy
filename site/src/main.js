import './app.css'

const app = document.getElementById('app')

function codeLine(parts) {
  return parts.map(([type, text]) => {
    if (type === 'plain') return text
    return `<span class="code-${type}">${text}</span>`
  }).join('')
}

app.innerHTML = `
  <canvas id="hero-canvas"></canvas>

  <!-- Nav -->
  <nav class="nav">
    <div class="nav-inner">
      <a href="/" class="nav-brand">rate-proxy</a>
      <div class="nav-links">
        <a href="https://github.com/harvey-woo/rate-proxy" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.npmjs.com/package/@cat5th/rate-proxy" target="_blank" rel="noopener">npm</a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <a href="https://pooljs.cat5th.com" target="_blank" rel="noopener" class="hero-badge">Powered by @cat5th/pool.js</a>
      <h1 class="hero-title">
        Rate-Limited<br>HTTP Reverse Proxy
      </h1>
      <p class="hero-desc">
        Protect upstream servers with precise concurrency control.<br>
        Simple, lightweight, built on ES2024 resource management.
      </p>
      <div class="hero-install">
        <span class="hl-meta">$</span> <span class="hl-keyword">npm</span> <span class="hl-keyword">install</span> <span class="hl-flag">-g</span> <span class="hl-string">@cat5th/rate-proxy</span>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="features">
    <div class="container">
      <h2 class="section-title">Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-num">01</div>
          <h3>Concurrency Control</h3>
          <p>Limit the number of simultaneous upstream connections. New requests queue automatically when the limit is reached.</p>
        </div>
        <div class="feature-card">
          <div class="feature-num">02</div>
          <h3>Zero Config</h3>
          <p>One environment variable to start. Sensible defaults for port (8080), concurrency (5), and timeout (120s).</p>
        </div>
        <div class="feature-card">
          <div class="feature-num">03</div>
          <h3>Transparent Proxy</h3>
          <p>Forwards headers, handles request bodies, streams responses back. Full HTTP proxy with rate limiting.</p>
        </div>
        <div class="feature-card">
          <div class="feature-num">04</div>
          <h3>Timeout Protection</h3>
          <p>Configurable request timeout with proper 504 responses. Prevents hung connections from consuming resources.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Usage -->
  <section class="usage">
    <div class="container">
      <h2 class="section-title">Usage</h2>
      <div class="usage-grid">
        <div class="usage-block">
          <span class="usage-label">Basic</span>
          <pre><code>${codeLine([
            ['var', 'TARGET'], ['plain', '='], ['string', 'http://api.example.com'], ['plain', ' '],
            ['cmd', 'rate-proxy']
          ])}</code></pre>
        </div>
        <div class="usage-block">
          <span class="usage-label">Custom concurrency</span>
          <pre><code>${codeLine([
            ['var', 'TARGET'], ['plain', '='], ['string', 'http://api.example.com'], ['plain', ' \\'],
            ['var', 'CONCURRENCY'], ['plain', '='], ['num', '2'], ['plain', ' '],
            ['cmd', 'rate-proxy']
          ])}</code></pre>
        </div>
        <div class="usage-block">
          <span class="usage-label">Via npx (no install)</span>
          <pre><code>${codeLine([
            ['var', 'TARGET'], ['plain', '='], ['string', 'http://api.example.com'], ['plain', ' \\'],
            ['plain', '  '], ['meta', 'npx'], ['plain', ' '], ['string', '@cat5th/rate-proxy']
          ])}</code></pre>
        </div>
      </div>

      <h3 class="env-title">Environment Variables</h3>
      <table class="env-table">
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>TARGET</code></td>
            <td>—</td>
            <td>Upstream server URL (required)</td>
          </tr>
          <tr>
            <td><code>PORT</code></td>
            <td><code>8080</code></td>
            <td>Local listening port</td>
          </tr>
          <tr>
            <td><code>CONCURRENCY</code></td>
            <td><code>5</code></td>
            <td>Max concurrent upstream requests</td>
          </tr>
          <tr>
            <td><code>TIMEOUT</code></td>
            <td><code>120000</code></td>
            <td>Request timeout in milliseconds</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta">
    <div class="container">
      <h2>Get Started</h2>
      <p>Protect your upstream servers in one command.</p>
      <code class="cta-code">TARGET=&lt;your-api&gt; rate-proxy</code>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <span>MIT License · <a href="https://github.com/harvey-woo/rate-proxy">harvey-woo/rate-proxy</a></span>
    </div>
  </footer>
`

// particles.js style effect
const canvas = document.getElementById('hero-canvas')
const ctx = canvas.getContext('2d')

function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', resize)

const PCOUNT = 80
const CONNECTION_DIST = 150
const MOUSE_RADIUS = 150

const particles = []
for (let i = 0; i < PCOUNT; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    r: Math.random() * 2 + 1,
  })
}

// Mouse tracking
const mouse = { x: null, y: null }
canvas.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})
canvas.addEventListener('mouseleave', () => {
  mouse.x = null
  mouse.y = null
})

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update particles
  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1

    // Clamp to screen
    p.x = Math.max(0, Math.min(canvas.width, p.x))
    p.y = Math.max(0, Math.min(canvas.height, p.y))
  }

  // Draw connections between nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.3
        ctx.beginPath()
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
        ctx.lineWidth = 0.6
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }

  // Mouse interaction - push particles away and draw connections to cursor
  if (mouse.x != null && mouse.y != null) {
    for (const p of particles) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Draw line to cursor if nearby
      if (dist < CONNECTION_DIST * 1.5) {
        const alpha = (1 - dist / (CONNECTION_DIST * 1.5)) * 0.4
        ctx.beginPath()
        ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
        ctx.lineWidth = 0.8
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
      }
    }
  }

  // Draw particles
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(129, 140, 248, 0.8)'
    ctx.fill()

    // Outer glow
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)'
    ctx.fill()
  }

  requestAnimationFrame(draw)
}
draw()
