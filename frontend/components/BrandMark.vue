<template>
  <NuxtLink
    :to="to"
    :aria-label="ariaLabel"
    class="brandmark-root"
  >
    <span class="logo-svg">
      <span class="logo-rotate">
        <span class="logo-pulse-fade">
          <svg :width="iconSize" :height="iconSize" viewBox="2.8 -3.1 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <span v-if="showText" class="brand-text ml-2">sea<span style="color: seagreen">tre</span></span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: { type: String, default: '/' },
  showText: { type: Boolean, default: true },
  iconSize: { type: [Number, String], default: 40 },
  ariaLabel: { type: String, default: 'Seatre brand' }
})
</script>

<style scoped>
/* Ensure root is an inline-flex clickable area */
.brandmark-root { display: inline-flex; align-items: center; }
/* Logo animations (scoped to this component) */
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
