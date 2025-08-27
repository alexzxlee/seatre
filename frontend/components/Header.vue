<template>
  <header>
      <nav>
        <ul>
          <li class="logo-brand">
            <NuxtLink to="/" class="brand">
              <span class="logo-svg">
                <!-- SVG with 's' letters in a round O outline, rotated as requested -->
                <span class="logo-rotate">
                  <span class="logo-pulse-fade">
                    <svg width="40" height="40" viewBox="2.8 -3.1 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <!-- Top (horizontal) -->
                    <text x="17.5" y="7" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 7)">s</text>
                    <!-- Top-right (135°) -->
                    <text x="29" y="15" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(135 31 11)">s</text>
                    <!-- Right (vertical) -->
                    <text x="36" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Bottom-right (225°) -->
                    <text x="32" y="33.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(225 31 29)">s</text>
                    <!-- Bottom (horizontal) -->
                    <text x="18" y="33" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 33)">s</text>
                    <!-- Bottom-left (315°) -->
                    <text x="14" y="33" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(315 9 29)">s</text>
                    <!-- Left (vertical) -->
                    <text x="9.5" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Top-left (45°) -->
                    <text x="10.5" y="8.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(45 9 11)">s</text>
                    <!-- Inner ring (same size) -->
                    <!-- Top -->
                    <text x="18" y="13.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 13.5)">s</text>
                    <!-- Right -->
                    <text x="29" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Bottom -->
                    <text x="17.5" y="26.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 26.5)">s</text>
                    <!-- Left -->
                    <text x="16.5" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                  </g>
                    </svg>
                  </span>
                </span>
                <span class="brand-text">seatre</span>
              </span>
            </NuxtLink>
          </li>
          <!-- Take Climate Action (existing, for context) -->
          <li class="nav-item dropdown"
            ref="actionRef"
            @mouseenter="dropdownHover = true; openDropdown = 'action'"
            @mouseleave="dropdownHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
            <span :class="['nav-link', { 'nav-link-open': openDropdown === 'action' }]">
              Take Climate Action
              <svg width="18" height="18" viewBox="0 0 20 20" style="vertical-align:middle;">
                <polyline v-if="openDropdown !== 'action'" points="6 8 10 12 14 8" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline v-else points="6 12 10 8 14 12" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <teleport to="body">
              <ul v-if="openDropdown === 'action'"
                  class="dropdown-menu dropdown-fixed"
                  :style="{ ...dropdownStyles.action, minWidth: dropdownWidth + 'px' }"
                  @mouseenter="menuHover = true; openDropdown = 'action'"
                  @mouseleave="menuHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
                <li><NuxtLink to="/businesses">For Businesses</NuxtLink></li>
                <li class="active community-label">Our Community</li>
                <li class="sub-item"><NuxtLink to="/coalition">Restorative Coalition</NuxtLink></li>
                <li class="sub-item"><NuxtLink to="/treeferral">treeferral Program</NuxtLink></li>
              </ul>
            </teleport>
          </li>
          <!-- Why seatre -->
          <li class="nav-item dropdown"
            ref="whyRef"
            @mouseenter="dropdownHover = true; openDropdown = 'why'"
            @mouseleave="dropdownHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
            <span :class="['nav-link', { 'nav-link-open': openDropdown === 'why' }]">
              Why seatre
              <svg width="18" height="18" viewBox="0 0 20 20" style="vertical-align:middle;">
                <polyline v-if="openDropdown !== 'why'" points="6 8 10 12 14 8" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline v-else points="6 12 10 8 14 12" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <teleport to="body">
              <ul v-if="openDropdown === 'why'"
                  class="dropdown-menu dropdown-fixed"
                  :style="{ ...dropdownStyles.why, minWidth: dropdownWidth + 'px' }"
                  @mouseenter="menuHover = true; openDropdown = 'why'"
                  @mouseleave="menuHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
                <li><NuxtLink to="/how-it-works">How It Works</NuxtLink></li>
                <li><NuxtLink to="/technology">Our Technology</NuxtLink></li>
                <li><NuxtLink to="/impact">Measurable Impact</NuxtLink></li>
                <li><NuxtLink to="/content">Marketable Content</NuxtLink></li>
              </ul>
            </teleport>
          </li>
          <!-- About Us -->
          <li class="nav-item dropdown"
            ref="aboutRef"
            @mouseenter="dropdownHover = true; openDropdown = 'about'"
            @mouseleave="dropdownHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
            <span :class="['nav-link', { 'nav-link-open': openDropdown === 'about' }]">
              About Us
              <svg width="18" height="18" viewBox="0 0 20 20" style="vertical-align:middle;">
                <polyline v-if="openDropdown !== 'about'" points="6 8 10 12 14 8" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline v-else points="6 12 10 8 14 12" fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <teleport to="body">
              <ul v-if="openDropdown === 'about'"
                  class="dropdown-menu dropdown-fixed"
                  :style="{ ...dropdownStyles.about, minWidth: dropdownWidth + 'px' }"
                  @mouseenter="menuHover = true; openDropdown = 'about'"
                  @mouseleave="menuHover = false; setTimeout(() => { if (!dropdownHover && !menuHover) openDropdown = null }, 50)">
                <li><NuxtLink to="/our-story">Our Story</NuxtLink></li>
                <li><NuxtLink to="/resources">Resources</NuxtLink></li>
                <li><NuxtLink to="/impact">Impact</NuxtLink></li>
              </ul>
            </teleport>
          </li>
        <li>
          <button type="button" class="theme-toggle-btn" @click="toggleColorMode" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <span v-if="!isDark">🌙</span>
            <span v-else>☀️</span>
          </button>
        </li>
          <li>
          <NuxtLink to="/login" >Login</NuxtLink>
        </li>
        </ul>
	  </nav>
  </header>
</template>

<script setup>
import { ref, reactive, watch, nextTick, computed } from 'vue'
// color-mode composable is auto-imported by Nuxt; no explicit import needed
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
const openDropdown = ref(null)
const dropdownHover = ref(false)
const menuHover = ref(false)
const actionRef = ref(null)
const whyRef = ref(null)
const aboutRef = ref(null)
const dropdownStyles = reactive({ action: {}, why: {}, about: {} })
const dropdownWidth = ref(0)

watch(openDropdown, async (val) => {
  await nextTick()
  let refMap = { action: actionRef, why: whyRef, about: aboutRef }
  if (actionRef.value) {
    dropdownWidth.value = actionRef.value.getBoundingClientRect().width
  }
  if (val && refMap[val] && refMap[val].value) {
    const rect = refMap[val].value.getBoundingClientRect()
    dropdownStyles[val] = {
      left: rect.left + 'px',
      top: rect.bottom + 'px',
      position: 'fixed',
    }
  }
})
</script>

<style scoped>
/* Dark mode toggle button */
.theme-toggle-btn {
  background: transparent;
  border: 1px solid var(--color-border, #ddd);
  color: var(--color-fg, #111);
  padding: 0.4rem 0.7rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.theme-toggle-btn:hover {
  background: rgba(0,0,0,0.06);
}
.dark .theme-toggle-btn:hover {
  background: rgba(255,255,255,0.08);
}

.logo-brand {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 48px;
  flex: 0 0 auto; /* prevent logo from stretching */
}

.logo-svg {
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 48px;
}

.logo-rotate {
  display: flex;
  align-items: center;
  animation: logo-rotate-pause 25s linear infinite;
}
.logo-pulse-fade {
  display: flex;
  align-items: center;
  animation: logo-pulse-fade-pause 25s ease-in-out infinite;
}


@keyframes logo-rotate-pause {
  0% { transform: rotate(0deg); }
  60% { transform: rotate(1800deg); }
  100% { transform: rotate(1800deg); }
}
@keyframes logo-pulse-fade-pause {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  12% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  60% {
    /* ...existing code... */
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes logo-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: rgba(255, 255, 255, 0.2); /* semi-transparent */
  backdrop-filter: blur(10px); /* glass effect */
  color: white;
  padding: 1rem 7.5rem;
  overflow: hidden;
  z-index: 100;
}


nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* keep items together on the left, use margin-left:auto on login */
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 0;
  font-weight: bold;
  gap: 0.25rem;
  flex-wrap: nowrap; /* prevent items from wrapping to next line */
}

.nav-item {
  position: relative;
  margin: 0 0.9rem; /* tightened spacing to reduce chance of wrapping */
  font-weight: 600;
  font-size: 1rem; /* unify with dropdown items */
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 0 0 auto; /* don't grow or shrink unexpectedly */
}

/* keep a single rule for the login link so it reliably pushes to the right */
.login-link {
  margin-left: auto;
  font-size: 1rem;
  display: flex;
  align-items: center;
}


header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('/seatre_2.jpg') center/cover no-repeat;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.3em;
  color: #111;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 0.7rem;
  border-radius: 0.4em;
  transition: background 0.15s;
}
.nav-link:hover, .nav-item:hover > .nav-link,
.nav-link.nav-link-open {
  color: #111;
}
.dropdown-menu {
  position: absolute;
  top: 2.8rem;
  left: 0;
  min-width: 480px;
  background: #fff;
  border-radius: 1.2em;
  box-shadow: 0 8px 32px 0 rgba(60,60,60,0.12);
  padding: 1.2rem 2rem 1.2rem 2rem;
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  font-size: 1rem;
  color: #222;
  font-weight: 400;
  animation: dropdown-fade-in 0.18s;
}
.dropdown-fixed {
  position: fixed;
  top: 60px; /* reverted to previous closer value */
  left: 265px; /* aligns with nav item, adjust as needed */
}
.dropdown-menu li {
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 1.3;
}
.dropdown-menu li a,
.dropdown-menu li :deep(a) {
  color: #222;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.15s;
}
.dropdown-menu li.active,
.dropdown-menu li.active a,
.dropdown-menu li.active :deep(a) {
  font-weight: 400;
  color: #111;
  cursor: default;
}
.dropdown-menu .community-label {
  padding-left: 0;
  font-weight: 400;
  font-size: 1rem;
  pointer-events: none;
  color: #222;
  display: flex;
  align-items: center;
  min-height: 1.8em;
}

.dropdown-menu li:first-child a {
  padding-left: 0;
  font-size: 1rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  min-height: 1.8em;
}
.dropdown-menu .sub-item {
  padding-left: 2em;
  font-size: 1rem;
}
.dropdown-menu li a:hover,
.dropdown-menu li :deep(a:hover) {
  color: #0a6cff;
}
@keyframes dropdown-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

nav a {
  color: darkblue;
  text-decoration: none;
  position: relative;
  z-index: 2;
}
.brand-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: darkblue;
  line-height: 1;
  display: flex;
  align-items: center;
  height: 48px;
  margin-left: 0.6rem;
}
/* (duplicate login-link removed) */
</style>