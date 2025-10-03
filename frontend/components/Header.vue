<template>
  <header class="site-header pt-6">
    <div class="header-inner">
      <div class="header-fixed-row">
        
        <!-- Left: Logo/Brand -->
        <NuxtLink to="/" class="brand mr-8 flex items-center">
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
                    <text x="36" y="19">s</text>
                    <!-- Bottom-right (225°) -->
                    <text x="32" y="33.5" transform="rotate(225 31 29)">s</text>
                    <!-- Bottom (horizontal) -->
                    <text x="18" y="33" transform="rotate(90 20 33)">s</text>
                    <!-- Bottom-left (315°) -->
                    <text x="14" y="33" transform="rotate(315 9 29)">s</text>
                    <!-- Left (vertical) -->
                    <text x="9.5" y="19">s</text>
                    <!-- Top-left (45°) -->
                    <text x="10.5" y="8.5" transform="rotate(45 9 11)">s</text>
                    <!-- Inner ring -->
                    <text x="18" y="13.5" transform="rotate(90 20 13.5)">s</text>
                    <text x="29" y="19">s</text>
                    <text x="17.5" y="26.5" transform="rotate(90 20 26.5)">s</text>
                    <text x="16.5" y="19">s</text>
                  </g>
                </svg>
              </span>
            </span>
          </span>
          <span class="brand-text ml-2">sea<span style="color: seagreen">tre</span></span>
        </NuxtLink>

        <!-- Desktop nav: fills the rest of the row, hidden on mobile and narrow window -->
        <div class="flex-1 min-w-0 desktop-nav">
          <UNavigationMenu 
            :items="items" 
            orientation="horizontal" 
            content-orientation="vertical" 
            :ui="{
              item: 'mx-3',
              link: 'px-2 font-extrabold text-xs text-[darkblue]'
            }"
            class="px-2"
          >
            <template #separator>
              <span style="display:inline-block; width:1.2rem;"></span>
            </template>
            <!-- <template #theme-toggle>
              <button
                type="button"
                class="theme-toggle-btn"
                :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                @click="toggleColorMode"
              >
                <span v-if="!isDark">🌙</span>
                <span v-else>☀️</span>
              </button>
            </template> -->
          </UNavigationMenu>
        </div>  

        <NuxtLink to="/contact-us" class="contact-btn inline-flex items-center gap-2">
          Contact Us <Icon name="lucide:arrow-right" size="1.2em" />
        </NuxtLink>

        <!-- Hamburger/Close button for nav: only visible on mobile and narrow window -->
        <button @click="showVerticalMenu = !showVerticalMenu" 
          class="hamburger-btn ml-auto p-2 text-[darkblue] cursor-pointer" 
          :aria-label="showVerticalMenu ? 'Close menu' : 'Open menu'"
          >
          <template v-if="!showVerticalMenu">
            <Icon name="lucide:menu" class="w-8 h-8" aria-hidden="true" />
          </template>
          <template v-else>
            <Icon name="lucide:x" class="w-8 h-8 text-[seagreen]" aria-hidden="true" />
          </template>
        </button>
      </div>

      <!-- Vertical nav for mobile and narrow window: only visible when toggled -->
      <!-- Only both :collapsed=false :collapsed="false" are working (key is :) -->
      <div v-if="showVerticalMenu" class="flex-1 min-w-0 vertical-nav">
        <!-- <UNavigationMenu
          :items="verticalNavItems"
          orientation="vertical"
          type="single"
          collapsible
          class="px-4 py-4"
          :ui="{
            link: 'block py-2 px-4 text-base font-bold text-[darkblue] text-left'
          }"
        /> -->
        <VerticalHoverNav :items="verticalNavItems" @close-menu="showVerticalMenu = false" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
function toggleColorMode () {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
const showVerticalMenu = ref(false)
const navMenuClass = ref(getNavMenuClass())
function getNavMenuClass() {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 1340) {
      return 'px-1 font-extrabold text-sm text-[darkblue]';
    } else if (window.innerWidth < 1435) {
      return 'px-1 font-extrabold text-xs text-[darkblue]';
    } else {
      return 'px-1 font-extrabold text-sm text-[darkblue]';
    }
  }
  return 'px-1 font-extrabold text-sm text-[darkblue]';
}
function updateNavMenuClass() {
  navMenuClass.value = getNavMenuClass();
  if (typeof window !== 'undefined' && window.innerWidth > 1340) {
    showVerticalMenu.value = false;
  }
}
onMounted(() => {
  window.addEventListener('resize', updateNavMenuClass)
  updateNavMenuClass()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateNavMenuClass)
})
const items = ref([
  {
    label: 'Take Climate Action',
    children: [
      { label: 'For Businesses', icon: 'i-lucide:smile', to: '/businesses' },
      { label: 'Our Community', disabled: true },
      { label: 'Restorative Coalition', icon: 'i-lucide:smile', to: '/coalition', class: 'pl-8' }, // indentation
      { label: 'treeferral Program', icon: 'i-lucide:smile', to: '/treeferral', class: 'pl-8' } // indentation
    ],
    class: navMenuClass
  },
  {
    label: 'Why seatre',
    children: [
      { label: 'How It Works', icon: 'i-lucide:smile', to: '/how-it-works' },
      { label: 'Our Technology', icon: 'i-lucide:smile', to: '/technology' },
      { label: 'Measurable Impact', icon: 'i-lucide:smile', to: '/impact' },
      { label: 'Marketable Content', icon: 'i-lucide:smile', to: '/content' }
    ],
    class: navMenuClass
  },
  {
    label: 'Case Studies',
    children: [
      { label: 'From the ground', icon: 'i-lucide:smile', to: '/from-the-ground' },
      { label: 'Business highlights', icon: 'i-lucide:smile', to: '/business-highlights' },
    ],
    class: navMenuClass
  },  
  {
    label: 'Get Involved',
    children: [
      { label: 'Join Us', icon: 'i-lucide:smile', to: '/join' },
      { label: 'Volunteer', icon: 'i-lucide:smile', to: '/volunteer' },
      { label: 'Donate', icon: 'i-lucide:smile', to: '/donate' }
    ],
    class: navMenuClass
  },  
  {
    label: 'About Us',
    children: [
      { label: 'Our Story', icon: 'i-lucide:smile', to: '/our-story' },
      { label: 'Resources', icon: 'i-lucide:smile',  to: '/resources' },
      { label: 'Impact', icon: 'i-lucide:smile', to: '/impact' }
    ],
    class: navMenuClass
  },
  {
    slot: 'separator'
  },  
  {
    label: 'Blog',
    to: "/blog",
    class: navMenuClass
  },
  {
    label: 'Login',
    to: "/login",
    class: navMenuClass
  },
  // { slot: 'theme-toggle' }
  // {
  //   label: 'GitHub',
  //   icon: 'i-simple-icons-github',
  //   to: 'https://github.com/nuxt/ui',
  //   target: '_blank',
  //   class: navMenuClass
  // }
])

import VerticalHoverNav from './VerticalHoverNav.vue'
const verticalNavItems = computed(() => {
  const filtered = items.value.filter(item => item.slot !== 'separator');
  if (typeof window !== 'undefined' && window.innerWidth < 1340 && showVerticalMenu.value) {
    filtered.push({
      label: 'Contact Us',
      to: '/contact-us',
      class: 'contact-btn inline-flex items-center gap-2',
      icon: 'lucide:arrow-right'
    });
  }
  return filtered;
});
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
@media (max-width: 1340px) {
  .desktop-nav {
    display: none;
  }
  .contact-btn {
    display: none;
  }
}
@media (min-width: 1340px) {
  .hamburger-btn {
    display: none;
  }
  .vertical-nav {
    display: none;
  }
}

.contact-btn {
  background: linear-gradient(45deg, #1e3a8a 0%, #1e40af 40%, #60a5fa 60%, #93c5fd 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0003;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.contact-btn:hover {
  background: linear-gradient(45deg, #059669 0%, #10b981 40%, #34d399 60%, #6ee7b7 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #0004;
}

/* Force darkblue for all text in desktop nav */
.desktop-nav :deep(*) {
  color: darkblue !important;
}
/* Force gray for icons of subitems in desktop nav */
.desktop-nav :deep([class*="icon"]):not(.i-lucide\:chevron-down):not(.i-lucide\:chevron-up):not([class*="i-lucide:chevron-down"]):not([class*="i-lucide:chevron-up"]),
.desktop-nav :deep(.icon):not(.i-lucide\:chevron-down):not(.i-lucide\:chevron-up):not([class*="i-lucide:chevron-down"]):not([class*="i-lucide:chevron-up"]) {
  color: gray !important;
}
/* Force hover darkblue for icons of subitems in desktop nav */
.desktop-nav :deep(a:hover [class*="icon"]):not(.i-lucide\:chevron-down):not(.i-lucide\:chevron-up):not([class*="i-lucide:chevron-down"]):not([class*="i-lucide:chevron-up"]),
.desktop-nav :deep(a:hover .icon):not(.i-lucide\:chevron-down):not(.i-lucide\:chevron-up):not([class*="i-lucide:chevron-down"]):not([class*="i-lucide:chevron-up"]) {
  color: darkblue !important;
}
/* Force hover seagreen for subitems in desktop nav */
.desktop-nav :deep(a:hover p) {
  color: seagreen !important;
}

/* Custom background for UNavigationMenu popup subitems */
.desktop-nav :deep(.bg-default) {
  background:
    linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)),
    url('/images/seatre_15.png') top/cover no-repeat;
  outline: none !important;
  box-shadow: none !important;
}


</style>