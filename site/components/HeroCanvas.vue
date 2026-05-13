<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let animationId: number = 0

const PCOUNT = 80
const CONNECTION_DIST = 150

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

let particles: Particle[] = []
const mouse = { x: null as number | null, y: null as number | null }

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initParticles()
}

function initParticles() {
  if (!canvas.value) return
  particles = []
  for (let i = 0; i < PCOUNT; i++) {
    particles.push({
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
    })
  }
}

function draw() {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > canvas.value.width) p.vx *= -1
    if (p.y < 0 || p.y > canvas.value.height) p.vy *= -1
    p.x = Math.max(0, Math.min(canvas.value.width, p.x))
    p.y = Math.max(0, Math.min(canvas.value.height, p.y))
  }

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

  if (mouse.x != null && mouse.y != null) {
    for (const p of particles) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
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

  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(129, 140, 248, 0.8)'
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)'
    ctx.fill()
  }

  animationId = requestAnimationFrame(draw)
}

function onMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseLeave() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  canvas.value.addEventListener('mousemove', onMouseMove)
  canvas.value.addEventListener('mouseleave', onMouseLeave)
  draw()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  if (canvas.value) {
    canvas.value.removeEventListener('mousemove', onMouseMove)
    canvas.value.removeEventListener('mouseleave', onMouseLeave)
  }
})
</script>

<template>
  <canvas ref="canvas" class="hero-canvas" />
</template>

<style scoped>
.hero-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
