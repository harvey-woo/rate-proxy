<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div class="home">
    <ClientOnly>
      <HeroCanvas />
    </ClientOnly>

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <a href="https://pooljs.cat5th.com" target="_blank" rel="noopener" class="hero-badge">
          {{ $t('home.badgeText') }}
        </a>
        <h1 class="hero-title">
          {{ $t('home.titleLine1') }}<br>{{ $t('home.titleLine2') }}
        </h1>
        <p class="hero-desc">
          {{ $t('home.descLine1') }}<br>{{ $t('home.descLine2') }}
        </p>
        <div class="hero-install">
          <span class="hl-meta">$</span> <span class="hl-keyword">npm</span> <span class="hl-keyword">install</span> <span class="hl-flag">-g</span> <span class="hl-string">@cat5th/rate-proxy</span>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">{{ $t('features.title') }}</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-num">01</div>
            <h3>{{ $t('features.concurrencyTitle') }}</h3>
            <p>{{ $t('features.concurrencyDesc') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-num">02</div>
            <h3>{{ $t('features.zeroConfigTitle') }}</h3>
            <p>{{ $t('features.zeroConfigDesc') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-num">03</div>
            <h3>{{ $t('features.transparentProxyTitle') }}</h3>
            <p>{{ $t('features.transparentProxyDesc') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-num">04</div>
            <h3>{{ $t('features.timeoutTitle') }}</h3>
            <p>{{ $t('features.timeoutDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage -->
    <section class="usage">
      <div class="container">
        <h2 class="section-title">{{ $t('usage.title') }}</h2>
        <div class="usage-grid">
          <div class="usage-block">
            <span class="usage-label">{{ $t('usage.basicLabel') }}</span>
            <pre><code><span class="hl-var">TARGET</span>=<span class="hl-string">http://api.example.com</span> <span class="hl-cmd">rate-proxy</span></code></pre>
          </div>
          <div class="usage-block">
            <span class="usage-label">{{ $t('usage.concurrencyLabel') }}</span>
            <pre><code><span class="hl-var">TARGET</span>=<span class="hl-string">http://api.example.com</span> \<br><span class="hl-var">CONCURRENCY</span>=<span class="hl-num">2</span> <span class="hl-cmd">rate-proxy</span></code></pre>
          </div>
          <div class="usage-block">
            <span class="usage-label">{{ $t('usage.npxLabel') }}</span>
            <pre><code><span class="hl-var">TARGET</span>=<span class="hl-string">http://api.example.com</span> \<br>  <span class="hl-meta">npx</span> <span class="hl-string">@cat5th/rate-proxy</span></code></pre>
          </div>
        </div>

        <h3 class="env-title">{{ $t('usage.envTitle') }}</h3>
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
              <td>{{ $t('usage.envTarget') }}</td>
            </tr>
            <tr>
              <td><code>PORT</code></td>
              <td><code>8080</code></td>
              <td>{{ $t('usage.envPort') }}</td>
            </tr>
            <tr>
              <td><code>CONCURRENCY</code></td>
              <td><code>5</code></td>
              <td>{{ $t('usage.envConcurrency') }}</td>
            </tr>
            <tr>
              <td><code>TIMEOUT</code></td>
              <td><code>120000</code></td>
              <td>{{ $t('usage.envTimeout') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <h2>{{ $t('cta.title') }}</h2>
        <p>{{ $t('cta.desc') }}</p>
        <code class="cta-code">TARGET=&lt;your-api&gt; rate-proxy</code>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

/* Hero */
.hero {
  position: relative;
  padding: 200px 24px 140px;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 12px;
  color: #818cf8;
  border: 1px solid rgba(129, 140, 248, 0.25);
  border-radius: 100px;
  padding: 4px 14px;
  margin-bottom: 32px;
  background: rgba(129, 140, 248, 0.05);
  text-decoration: none;
  transition: border-color 0.2s, text-decoration-color 0.2s;
  text-underline-offset: 4px;
}

.hero-badge:hover {
  border-color: #818cf8;
  text-decoration: underline #818cf8;
}

.hero-title {
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #fff 0%, #818cf8 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 18px;
  color: #a1a1aa;
  max-width: 480px;
  margin: 0 auto 40px;
  line-height: 1.7;
}

.hero-install {
  display: inline-block;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 14px;
  background: #0e0e12;
  border: 1px solid #1e1e24;
  border-radius: 10px;
  padding: 14px 28px;
  color: #e4e4e7;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  user-select: all;
}

.hero-install:hover {
  border-color: #818cf8;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
}

/* Code colors */
.hl-meta { color: #34d399; }
.hl-keyword { color: #818cf8; }
.hl-flag { color: #f472b6; }
.hl-string { color: #60a5fa; }
.hl-num { color: #fbbf24; }
.hl-var { color: #fb923c; }
.hl-cmd { color: #34d399; }

/* Features */
.features {
  padding: 100px 24px;
  border-top: 1px solid #1e1e24;
  border-bottom: 1px solid #1e1e24;
  background: linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.02) 50%, transparent 100%);
}

.section-title {
  text-align: center;
  font-size: 13px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #52525b;
  margin-bottom: 48px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.feature-card {
  background: #0d0d11;
  border: 1px solid #1e1e24;
  border-radius: 12px;
  padding: 32px;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  border-color: rgba(129, 140, 248, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
}

.feature-num {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 12px;
  color: #818cf8;
  margin-bottom: 16px;
  opacity: 0.8;
}

.feature-card h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #e4e4e7;
}

.feature-card p {
  font-size: 14px;
  color: #a1a1aa;
  line-height: 1.7;
}

/* Usage */
.usage {
  padding: 100px 24px;
  border-bottom: 1px solid #1e1e24;
}

.usage-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 64px;
}

.usage-block {
  background: #0e0e12;
  border: 1px solid #1e1e24;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.usage-block:hover {
  border-color: #52525b;
}

.usage-label {
  display: block;
  font-size: 11px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 14px 20px 0;
}

.usage-block pre {
  padding: 8px 20px 18px;
  overflow-x: auto;
}

.usage-block code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.8;
  color: #e4e4e7;
}

.env-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #e4e4e7;
}

.env-table {
  width: 100%;
  border-collapse: collapse;
}

.env-table th {
  text-align: left;
  font-size: 12px;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-weight: 500;
  color: #52525b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 16px 12px;
  border-bottom: 1px solid #1e1e24;
}

.env-table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #a1a1aa;
  border-bottom: 1px solid #1e1e24;
}

.env-table td:first-child,
.env-table th:first-child {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  color: #e4e4e7;
  font-size: 13px;
}

.env-table td code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  color: #818cf8;
}

.env-table tr:last-child td {
  border-bottom: none;
}

/* CTA */
.cta {
  padding: 100px 24px;
  text-align: center;
  border-bottom: 1px solid #1e1e24;
}

.cta h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #e4e4e7;
}

.cta p {
  font-size: 16px;
  color: #a1a1aa;
  margin-bottom: 32px;
}

.cta-code {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 14px;
  background: #0e0e12;
  border: 1px solid #1e1e24;
  border-radius: 8px;
  padding: 12px 24px;
  color: #818cf8;
}

/* Responsive */
@media (max-width: 640px) {
  .hero {
    padding: 140px 24px 80px;
  }

  .features,
  .usage,
  .cta {
    padding: 64px 24px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .hero-desc {
    font-size: 16px;
  }
}
</style>
