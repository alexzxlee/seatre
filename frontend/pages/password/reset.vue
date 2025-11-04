<template>
  <div class="reset-container">
    <div class="image-section">
      <img src="/images/seatre_11.jpg" alt="Seatre reset" class="hero-image" />
    </div>
    <div class="form-section">
      <div class="card">
        <div class="brand"><BrandMark class="logo-link" aria-label="Seatre brand" /></div>
        <h1 class="title">Reset your password</h1>
        <p class="subtitle">Enter a new password for your account.</p>

        <form @submit.prevent="submit" class="form" v-if="!success">
          <input v-model="password" type="password" placeholder="New password" class="input" :disabled="loading" />
          <input v-model="confirm" type="password" placeholder="Confirm new password" class="input" :disabled="loading" />
          <p v-if="fieldError" class="field-error">{{ fieldError }}</p>
          <button type="submit" class="button" :disabled="loading">{{ loading ? 'Saving…' : 'Save Password' }}</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>

        <div v-else class="success-block">
          <p class="success">Your password has been reset successfully.</p>
          <NuxtLink to="/login" class="back-link">Return to login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'minimal' })
const route = useRoute()
const token = computed(() => String(route.query.token || ''))
const apiFetch = useApiFetch()

const password = ref('')
const confirm = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
const fieldError = ref('')

function validate() {
  if (!token.value) {
    error.value = 'Reset token is missing.'
    return false
  }
  if (!password.value || password.value.length < 6) {
    fieldError.value = 'Password must be at least 6 characters.'
    return false
  }
  if (password.value !== confirm.value) {
    fieldError.value = 'Passwords do not match.'
    return false
  }
  fieldError.value = ''
  return true
}

async function submit() {
  if (!validate()) return
  loading.value = true
  error.value = null
  try {
    await apiFetch('/auth/reset-password', { method: 'POST', body: { token: token.value, password: password.value } })
    success.value = true
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}
watch([password, confirm], () => { if (fieldError.value) fieldError.value = '' })
</script>

<style scoped>
.reset-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.image-section {
  flex: 0 0 50vw;
  width: 50vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.form-section {
  flex: 0 0 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.brand {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0.25rem 0;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.input {
  width: 75%;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0 1rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.field-error {
  width: 75%;
  color: #6b7280;
  font-size: 0.85rem;
  text-align: left;
}

.button {
  width: 75%;
  height: 48px;
  background: #1f2937;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.success {
  color: #065f46;
  background: #d1fae5;
  border: 1px solid #34d399;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 75%;
  margin: 0 auto;
}

.error {
  color: #B42318;
  background: #FEF3F2;
  border: 1px solid #FEE4E2;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 75%;
  margin: 0 auto;
}

.back-link {
  display: block;
  margin-top: 0.75rem;
  color: #1f2937;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .image-section {
    display: none;
  }
  
  .form-section {
    width: 100vw;
    flex: 1 1 100vw;
    padding: 1rem;
  }
  
  .card {
    max-width: 360px;
  }
}
</style>