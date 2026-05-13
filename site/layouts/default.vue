<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandNpm,
  IconStarFilled,
  IconDownload,
  IconMenu,
  IconX
} from '@tabler/icons-vue'

const localePath = useLocalePath()

const mobileOpen = ref(false)
const githubStars = ref<string | null>(null)
const npmDownloads = ref<string | null>(null)

async function fetchGitHubStars() {
  try {
    const res = await fetch('https://api.github.com/repos/harvey-woo/rate-proxy')
    const data = await res.json()
    githubStars.value = String(data.stargazers_count)
  } catch {
    // ignore
  }
}

async function fetchNpmDownloads() {
  try {
    const res = await fetch('https://api.npmjs.org/downloads/point/last-week/@cat5th/rate-proxy')
    const data = await res.json()
    npmDownloads.value = String(data.downloads)
  } catch {
    // ignore
  }
}

onMounted(() => {
  fetchGitHubStars()
  fetchNpmDownloads()
})

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <div class="app">
    <header class="site-header">
      <div class="header-inner">
        <NuxtLink :to="localePath('/')" class="logo">
          rate-proxy
        </NuxtLink>

        <nav class="nav-links">
        </nav>

        <div class="header-actions">
          <a href="https://github.com/harvey-woo/rate-proxy" target="_blank" rel="noopener" class="github-badge" aria-label="GitHub">
            <IconBrandGithub class="github-icon" />
            <span v-if="githubStars !== null" class="github-count">{{ githubStars }}</span>
            <IconStarFilled class="github-star" />
          </a>
          <a href="https://www.npmjs.com/package/@cat5th/rate-proxy" target="_blank" rel="noopener" class="npm-badge" aria-label="npm">
            <IconBrandNpm class="npm-icon" />
            <span v-if="npmDownloads !== null" class="npm-count">{{ npmDownloads }}</span>
            <IconDownload class="npm-dl" />
          </a>
          <LangSwitcher />
        </div>

        <button class="mobile-toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
          <IconMenu v-if="!mobileOpen" />
          <IconX v-else />
        </button>
      </div>

      <div v-if="mobileOpen" class="mobile-nav">
        <div class="mobile-lang-switcher">
          <LangSwitcher />
        </div>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <span>{{ $t('footer.text') }} · <a href="https://github.com/harvey-woo/rate-proxy" target="_blank" rel="noopener">{{ $t('footer.linkText') }}</a></span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #07070a;
  color: #e4e4e7;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(7, 7, 10, 0.7);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #1e1e24;
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 15px;
  font-weight: 600;
  color: #e4e4e7;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.github-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #1e1e24;
  color: #e4e4e7;
  text-decoration: none;
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.2s;
}

.github-badge:hover {
  background: #2a2a30;
}

.github-icon {
  width: 16px;
  height: 16px;
  color: #e4e4e7;
}

.github-count {
  color: #e4e4e7;
}

.github-star {
  width: 12px;
  height: 12px;
  color: #fbbf24;
}

.npm-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #cb3837;
  color: #fff;
  text-decoration: none;
  padding: 4px 10px 4px 8px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.2s;
}

.npm-badge:hover {
  background: #b32f2e;
}

.npm-icon {
  width: 16px;
  height: 16px;
  color: #fff;
}

.npm-count {
  color: #fff;
}

.npm-dl {
  width: 12px;
  height: 12px;
  color: #fff;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  color: #e4e4e7;
  cursor: pointer;
  padding: 4px;
}

.mobile-toggle:hover {
  color: #818cf8;
}

.mobile-nav {
  display: none;
  padding: 16px 24px;
  border-top: 1px solid #1e1e24;
  background: #0d0d11;
}

.mobile-lang-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 8px;
}

.site-main {
  flex: 1;
}

.site-footer {
  border-top: 1px solid #1e1e24;
  padding: 40px 24px;
  text-align: center;
  font-size: 13px;
  color: #52525b;
}

.site-footer a {
  color: #a1a1aa;
}

.site-footer a:hover {
  color: #e4e4e7;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-nav {
    display: block;
  }
}
</style>
