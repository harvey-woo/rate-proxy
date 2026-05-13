<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const availableLocales = computed(() => locales.value.filter((l: { code: string }) => l.code !== 'default'))

const currentLocale = computed(() => locale.value)
</script>

<template>
  <div class="lang-switcher">
    <NuxtLink
      v-for="l in availableLocales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      class="lang-btn"
      :class="{ active: currentLocale === l.code }"
    >
      {{ l.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.lang-switcher {
  display: inline-flex;
  background: #1e1e24;
  border-radius: 999px;
  overflow: hidden;
}

.lang-btn {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.2s;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
}

.lang-btn.active {
  background: #818cf8;
  color: #07070a;
}

.lang-btn:not(.active):hover {
  color: #e4e4e7;
  background: #2a2a30;
}
</style>
