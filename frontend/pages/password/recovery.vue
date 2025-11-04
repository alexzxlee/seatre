<template>
  <div class="recovery-container">
    <div class="image-section">
      <img src="/images/seatre_16.jpg" alt="Seatre recovery" class="hero-image" />
    </div>
    <div class="form-section">
      <div class="card">
        <div class="brand">
          <BrandMark class="logo-link flex items-center justify-center" aria-label="Seatre brand" />
        </div>
        <h1 class="title">Forgot your password?</h1>
        <p class="subtitle">Enter your email address to receive a link to reset your password.</p>
        <form @submit.prevent="submit" class="form">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            :disabled="loading || success"
            class="input"
            :class="{ 'input-error': fieldError }"
          />
          <p v-if="fieldError" class="field-error">{{ fieldError }}</p>

          <button type="submit" class="button" :disabled="loading || success">
            {{ loading ? 'Sending…' : 'Send Link' }}
          </button>
          <p v-if="success" class="success">If that email exists, a reset link has been sent.</p>
          <p v-if="error" class="error">{{ error }}</p>
          <div class="back-link">
            <span>It just hit me! </span>
            <NuxtLink to="/login" class="link">Back to login</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'minimal' })

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
const fieldError = ref('')
const apiFetch = useApiFetch()

function validate() {
  if (!email.value.trim()) {
    fieldError.value = 'The email field is required'
    return false
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) {
    fieldError.value = 'Please enter a valid email address'
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
    await apiFetch('/auth/forgot-password', { method: 'POST', body: { email: email.value } })
    success.value = true
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

watch(email, () => { if (fieldError.value) fieldError.value = '' })
</script>

<style scoped>
.recovery-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.image-section {
  flex: 0 0 50vw;
  position: relative;
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
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0.25rem 0 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

/* Match Veritree-style: left-align heading/subtitle and align with input width */
.title,
.subtitle {
  text-align: left;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
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

.input-error {
  border-color: #FEE4E2;
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
  margin-top: 1.25rem;
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
}

.error {
  color: #B42318;
  background: #FEF3F2;
  border: 1px solid #FEE4E2;
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 75%;
}

.back-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.link {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  color: #111827;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-section {
    padding: 1rem;
  }
  
  .card {
    max-width: 360px;
  }
}
</style>