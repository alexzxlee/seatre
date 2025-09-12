<template>
  <section class="py-16 bg-slate-900 text-white">
    <div class="container mx-auto max-w-screen-2xl px-12 md:px-20">
      <h1 class="text-4xl md:text-6xl font-extrabold text-center mb-10">{{ title }}</h1>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ArticleCard
          v-for="a in articles"
          :key="a.to"
          :title="a.title"
          :to="a.to"
          :image="a.image"
          :excerpt="a.excerpt"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ArticleCard from '~/components/ArticleCard.vue'

defineProps({
  title: { type: String, default: 'Latest Articles' },
  articles: { type: Array, required: true }
})
</script>