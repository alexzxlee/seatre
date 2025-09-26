<template>
	<h1>Login</h1>
	<form @submit.prevent="login">
		<div>
			<input v-model="username" placeholder="Username" required />
		</div>
		<div>
			<input v-model="password" type="password" placeholder="Password" required />
		</div>
		<button type="submit" :disabled="loading">
			{{ loading ? 'Logging in...' : 'Login' }}
		</button>
		<p v-if="error" class="error">{{ error }}</p>
	</form>
</template>

<script setup>
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)
const apiFetch = useApiFetch()

const login = async () => {
  error.value = null
  loading.value = true
  try {
    await apiFetch('/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    await navigateTo('/dashboard')
  } catch (err) {
    console.error('Login failed:', err)
    error.value = 'Login failed: ' + (err?.data?.statusMessage || err?.message || 'Unknown error')
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body { font-family: Arial, sans-serif; }
</style>
