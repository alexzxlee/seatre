<template>
  <section class="bg-slate-900 text-white py-16">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:gap-10">
        <div class="flex-1 mb-8 md:mb-0">
          <h2 class="text-3xl font-extrabold mb-4">Sign Up for Our Newsletter</h2>
          <p class="mb-6 text-base">Receive updates on new ocean-cleaning projects and our restoration initiatives—delivered straight to your inbox.</p>
          <!-- Optional: add a decorative SVG line here if you want -->
        </div>
        <form class="newsletter-form flex flex-col flex-1" @submit.prevent="subscribe">
          <div class="flex flex-col md:flex-row items-center gap-4 w-full">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="newsletter-input rounded-full px-6 py-3 text-slate-900 bg-white w-full md:w-auto xl:min-w-80 flex-1 md:flex-initial focus:outline-none"
            />
            <button
              type="submit"
              class="newsletter-button rounded-full border border-white px-8 py-3 font-semibold hover:bg-white hover:text-slate-900 transition whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
              :disabled="loading"
            >
              {{ loading ? 'Sending…' : 'Subscribe' }}
            </button>
          </div>
          <p v-if="message" class="mt-3 text-sm text-emerald-300" role="status" aria-live="polite">{{ message }}</p>
          <p v-if="error" class="mt-3 text-sm text-rose-300" role="alert" aria-live="assertive">{{ error }}</p>
        </form>
      </div>
      <p class="mt-8 text-xs text-slate-400">
        You may unsubscribe at any time using the link in our newsletter. I agree to receive your newsletters and accept the data privacy statement.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')
const apiFetch = useApiFetch()

async function subscribe() {
  error.value = ''
  message.value = ''
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) { error.value = 'Please enter a valid email.'; return }
  loading.value = true
  try {
    await apiFetch('/newsletter/subscribe', { method: 'POST', body: { email: email.value } })
    message.value = 'Thanks! Please check your email for an unsubscribe link.'
    email.value = ''
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
</script>