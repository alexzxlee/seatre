<template>
  <div class="block rounded-2xl overflow-hidden bg-white text-slate-900 shadow ring-1 ring-black/10 transition">
    <img v-if="image" :src="image" :alt="title" class="w-full h-56 object-cover">
    <div class="p-5">
      <h3 class="text-xl font-extrabold leading-tight">{{ title }}</h3>
      <p v-if="excerpt" class="mt-2 text-sm text-slate-600">{{ excerpt }}</p>
      <div class="mt-5">
        <NuxtLink :to="to" class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
          Read Now <span class="i-lucide:arrow-right size-4"></span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  to: { type: String, required: true },
  image: { type: String, default: '' },
  excerpt: { type: String, default: '' }
})
</script>