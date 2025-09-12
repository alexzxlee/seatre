<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="brand">
        <span class="logo-svg">
          <span class="logo-rotate">
            <span class="logo-pulse-fade">
              <svg width="40" height="40" viewBox="2.8 -3.1 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="darkblue" font-family="monospace" font-size="9.5" font-weight="700" text-anchor="middle">
                  <!-- Top (horizontal) -->
                  <text x="17.5" y="7" transform="rotate(90 20 7)">s</text>
                  <!-- Top-right (135°) -->
                  <text x="29" y="15" transform="rotate(135 31 11)">s</text>
                  <!-- Right (vertical) -->
                  <text x="36" y="20">s</text>
                  <!-- Bottom-right (225°) -->
                  <text x="32" y="33.5" transform="rotate(225 31 29)">s</text>
                  <!-- Bottom (horizontal) -->
                  <text x="18" y="33" transform="rotate(90 20 33)">s</text>
                  <!-- Bottom-left (315°) -->
                  <text x="14" y="33" transform="rotate(315 9 29)">s</text>
                  <!-- Left (vertical) -->
                  <text x="9.5" y="20">s</text>
                  <!-- Top-left (45°) -->
                  <text x="10.5" y="8.5" transform="rotate(45 9 11)">s</text>
                  <!-- Inner ring -->
                  <text x="18" y="13.5" transform="rotate(90 20 13.5)">s</text>
                  <text x="29" y="20">s</text>
                  <text x="17.5" y="26.5" transform="rotate(90 20 26.5)">s</text>
                  <text x="16.5" y="20">s</text>
                </g>
              </svg>
            </span>
          </span>
        </span>
        <span class="brand-text">seatre</span>
      </NuxtLink>
      <UContainer>
        <UNavigationMenu :items="items" content-orientation="vertical"/>
      </UContainer>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="theme-toggle-btn"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleColorMode"
        >
          <span v-if="!isDark">🌙</span><span v-else>☀️</span>
        </button>
        <NuxtLink to="/login" class="login-link">Login</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function toggleColorMode () {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
const items = ref([
  {
    label: 'Take Climate Action',
    children: [
      { label: 'For Businesses', icon: 'i-lucide:smile', to: '/businesses' },
      { label: 'Our Community', disabled: true },
      { label: 'Restorative Coalition', icon: 'i-lucide:smile', to: '/coalition', class: 'pl-8' }, // indentation
      { label: 'treeferral Program', icon: 'i-lucide:smile', to: '/treeferral', class: 'pl-8' } // indentation
    ]
  },
  {
    label: 'Why seatre',
    children: [
      { label: 'How It Works', icon: 'i-lucide:smile', to: '/how-it-works' },
      { label: 'Our Technology', icon: 'i-lucide:smile', to: '/technology' },
      { label: 'Measurable Impact', icon: 'i-lucide:smile', to: '/impact' },
      { label: 'Marketable Content', icon: 'i-lucide:smile', to: '/content' }
    ]
  },
  {
    label: 'Case Studies',
    children: [
      { label: 'From the ground', icon: 'i-lucide:smile', to: '/from-the-ground' },
      { label: 'Business highlights', icon: 'i-lucide:smile', to: '/business-highlights' },
    ]
  },  
  {
    label: 'Get Involved',
    children: [
      { label: 'Join Us', icon: 'i-lucide:smile', to: '/join' },
      { label: 'Volunteer', icon: 'i-lucide:smile', to: '/volunteer' },
      { label: 'Donate', icon: 'i-lucide:smile', to: '/donate' }
    ]
  },  
  {
    label: 'About Us',
    children: [
      { label: 'Our Story', icon: 'i-lucide:smile', to: '/our-story' },
      { label: 'Resources', icon: 'i-lucide:smile',  to: '/resources' },
      { label: 'Impact', icon: 'i-lucide:smile', to: '/impact' }
    ]
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  }
])
</script>

<style scoped>
/* Logo animations only (all shared styles now in main.css) */
.logo-svg, .logo-rotate, .logo-pulse-fade { 
  display:flex; 
  align-items:center; 
  height:48px; 
}
.logo-rotate { animation: logo-rotate-pause 25s linear infinite; }
.logo-pulse-fade { animation: logo-pulse-fade-pause 25s ease-in-out infinite; }

@keyframes logo-rotate-pause {
  0% { transform: rotate(0); }
  60% { transform: rotate(1800deg); }
  100% { transform: rotate(1800deg); }
}
@keyframes logo-pulse-fade-pause {
  0% { transform: scale(1); opacity:1; }
  12% { transform: scale(1.15); opacity:.5; }
  100% { transform: scale(1); opacity:1; }
}
</style>