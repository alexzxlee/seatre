<template>
  <div class="min-h-[60vh] flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <h1 class="text-2xl font-bold mb-2">Unsubscribe</h1>
      <p class="text-gray-600 mb-6">We’re processing your request…</p>
      <p v-if="message" class="text-emerald-700">{{ message }}</p>
      <p v-if="error" class="text-red-600">{{ error }}</p>
      <NuxtLink to="/" class="text-blue-600 underline mt-4 inline-block">Back to Home</NuxtLink>
    </div>
  </div>
  
</template>

<script setup lang="ts">
definePageMeta({ layout: 'minimal' })
const route = useRoute()
const apiFetch = useApiFetch()
const message = ref('')
const error = ref('')

onMounted(async () => {
  const token = String(route.query.token || '')
  if (!token) { error.value = 'Missing token.'; return }
  try {
    const res = await apiFetch('/newsletter/unsubscribe', { method: 'POST', body: { token } })
    message.value = res?.message || 'You have been unsubscribed.'
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Unable to unsubscribe.'
  }
})
</script>
