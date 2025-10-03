<template>
  <nav class="vertical-nav-menu">
    <ul>
      <li
        v-for="(item, idx) in items"
        :key="item.label || idx"
        :class="['vertical-nav-item', { 'has-children': item.children }]"
      >
        <div
          class="vertical-nav-trigger"
          :class="{ 'open': openIndex === idx }"
          @mouseenter="onParentEnter(idx)"
          @mouseleave="onParentLeave"
        >
          <!-- Custom render for Contact Us button -->
          <div v-if="item.label === 'Contact Us'" style="width:100%;display:flex;justify-content:center;margin-top:1rem;">
            <NuxtLink
              :to="item.to"
              class="contact-btn inline-flex items-center gap-2"
              @click="onSubmenuClick"
            >
              Contact Us
              <Icon name="lucide:arrow-right" size="1.2em" />
            </NuxtLink>
          </div>
          <!-- Regular menu item -->
          <NuxtLink
            v-else-if="item.to"
            :to="item.to"
            class="vertical-nav-label w-full text-left bg-transparent border-0 p-0 m-0 font-inherit"
            :class="item.class"
            style="cursor:pointer;display:block;"
            @click="onSubmenuClick"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="vertical-nav-label"
            :class="item.class"
          >
            {{ item.label }}
          </span>
          <span v-if="item.children" class="vertical-nav-arrow">
            <svg
              :class="['chevron', { 'chevron-open': openIndex === idx }]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style="display:inline;vertical-align:middle"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="4,6 8,10 12,6"
                stroke="darkblue"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </div>
        <transition name="collapse">
          <ul
            v-if="item.children && openIndex === idx"
            class="vertical-nav-submenu"
            @mouseenter="submenuHover = true"
            @mouseleave="onSubmenuLeave"
          >
            <li v-for="(child, cidx) in item.children" :key="child.label || cidx">
              <NuxtLink
                v-if="!child.disabled"
                :to="child.to"
                class="block py-2 px-4 text-sm text-left text-[darkblue]"
                :class="child.class"
                @click="onSubmenuClick"
              >
                  <span style="display:inline-flex;align-items:center;vertical-align:middle;">
                    <Icon :name="child.icon ? child.icon.replace(/^i-/, '') : 'lucide:smile'" size="1.56em" style="margin-right:0.4em;" />
                    <span>{{ child.label }}</span>
                  </span>
              </NuxtLink>
              <span v-else class="block py-2 px-4 text-sm font-bold text-left text-[darkblue] cursor-default">
                {{ child.label }}
              </span>
            </li>
          </ul>
        </transition>
      </li>
    </ul>
  </nav>
  
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close-menu'])

function onSubmenuClick() {
  // Close the vertical menu when any submenu item is clicked
  emit('close-menu')
}
const openIndex = ref(null)
const submenuHover = ref(false)
let closeTimeout = null
function onParentEnter(idx) {
  clearTimeout(closeTimeout)
  openIndex.value = idx
}
function onParentLeave() {
  closeTimeout = setTimeout(() => {
    if (!submenuHover.value) openIndex.value = null
  }, 120)
}
function onSubmenuLeave() {
  submenuHover.value = false
  openIndex.value = null
}
</script>

<style scoped>
.vertical-nav-menu {
  padding: 1rem;
  padding-right: 1.5rem;
}
.vertical-nav-item {
  margin-bottom: 0.25rem;
  position: relative; /* Needed for pseudo-element positioning for the following vertical white line */
}

/* Show vertical white line when submenu is open, but only for items with children */
.vertical-nav-item.has-children .vertical-nav-trigger.open::before {
  content: '';
  position: absolute;
  left: 2.2rem;
  top: 2.2rem;
  height: calc(100% - 2.2rem);
  width: 1px;
  background: white;
  border-radius: 1px;
  opacity: 0.5;
  z-index: 1;
}
.vertical-nav-trigger {
  display: flex;
  align-items: center;
  cursor: default;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 700;
  color: var(--color-main);
  transition: background 0.15s;
}
.vertical-nav-label {
  flex: 1;
}
.vertical-nav-submenu .i-lucide\:smile {
  color: #888;
  transition: color 0.15s;
}
.vertical-nav-submenu li:hover .i-lucide\:smile {
  color: darkblue;
}
.vertical-nav-arrow {
  margin-left: 0.5em;
  display: flex;
  align-items: center;
  height: 1.2em;
}
/* The arrow chevrons' rotation is animated more slowly */
.chevron {
  transition: transform 0.36s cubic-bezier(.4,0,.2,1);
  color: darkblue;
}
.chevron-open {
  transform: rotate(-180deg);
}
.vertical-nav-submenu {
  background: transparent;
  padding-left: 2.5rem;
  margin-top: 0.1rem;
}
/* Smooth vertical collapse/expand for submenu */
.collapse-enter-active, .collapse-leave-active {
  transition: max-height 0.28s cubic-bezier(.4,0,.2,1), opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.28s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
/* Contact Us button style (copied from Header.vue for consistency) */
.contact-btn {
  pointer-events: auto;
  background: #0a6cff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0003;
  transition: background 0.2s;
}
.contact-btn:hover {
  background: seagreen;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(12px);
}
.collapse-enter-to, .collapse-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>
