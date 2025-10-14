<template>
	<div class="login-container">
		<!-- Left side - Image -->
		<div class="image-section">
			<img src="/images/seatre_16.jpg" alt="Seatre Environmental Impact" class="hero-image" />
		</div>
    
    <!-- Right side - Login Form -->
    <div class="form-section">
      <div class="login-form">
        <!-- Login Form -->
        <form @submit.prevent="login" novalidate class="form">

          <!-- Brand centered directly above the button -->
          <div class="brand">
            <BrandMark class="logo-link flex items-center justify-center" to="/login" aria-label="Seatre brand" />
          </div>

          <!-- Error banner (shown above inputs, same width and alignment as inputs) -->
          <p v-if="error" class="error-message" role="alert">{{ error }}</p>

          <div class="input-group">
						<input 
							v-model="email" 
							type="email"
							placeholder="Email" 
              :aria-invalid="Boolean(fieldErrors.email)"
              class="input-field" :class="{ 'input-error': fieldErrors.email }"
						/>
            <div v-if="fieldErrors.email" class="field-error">
              <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-1 error-icon" />
              <span>{{ fieldErrors.email }}</span>
            </div>
          </div>
					
          <div class="input-group">
						<input 
							v-model="password" 
							type="password" 
							placeholder="Password" 
              :aria-invalid="Boolean(fieldErrors.password)"
              class="input-field" :class="{ 'input-error': fieldErrors.password }"
						/>
            <div v-if="fieldErrors.password" class="field-error">
              <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-1 error-icon" />
              <span>{{ fieldErrors.password }}</span>
            </div>
					</div>

          <div class="forgot-password">
            <NuxtLink to="/password/recovery" class="forgot-link">Forgot password?</NuxtLink>
          </div>

					<button type="submit" :disabled="loading" class="signin-button">
						{{ loading ? 'Signing In...' : 'Sign In' }}
					</button>

					<div class="register-link">
						<span>Don't have an account? </span>
						<NuxtLink to="/register" class="link">Create one here</NuxtLink>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Use minimal layout (no header/footer)
definePageMeta({
  layout: 'minimal'
})

const email = ref<string>('alexzxlee@outlook.com')
const password = ref<string>('Alex2025')
const error = ref<string | null>(null)
const loading = ref<boolean>(false)
const apiFetch = useApiFetch()
interface FieldErrors { email?: string; password?: string }
const fieldErrors = ref<FieldErrors>({})

function validate() {
  const errs: FieldErrors = {}
  if (!email.value?.trim()) {
    errs.email = 'The email field is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errs.email = 'Please enter a valid email address'
  }
  if (!password.value?.trim()) {
    errs.password = 'The password field is required'
  }
  fieldErrors.value = errs
  return Object.keys(errs).length === 0
}

const login = async () => {
  error.value = null
  loading.value = true
  try {
    // Client-side validation (no native tooltip)
    if (!validate()) {
      loading.value = false
      return
    }
    // Debug: Check what base URL is being used
    const baseURL = useApiBase()
    console.log('API Base URL:', baseURL)
    
    const response = await apiFetch('/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    
    console.log('Login response:', response)
    
    // Check if login was successful - backend returns { user: {...} }
    if (response && response.user) {
      console.log('Login successful, user:', response.user)
      // Give a small delay to ensure cookies are set
      await new Promise(resolve => setTimeout(resolve, 100))
      await navigateTo('/dashboard')
    } else {
      throw new Error('Login failed: Invalid response from server')
    }
  } catch (err: any) {
    console.error('Login failed:', err)
    const status: number | undefined = err?.status
    if (status === 401) {
      error.value = 'Your email or password do not match our records. Please try again.'
    } else if (status === 429) {
      error.value = 'Too many attempts. Please wait a moment and try again.'
    } else {
      error.value = err?.data?.message || err?.message || 'Something went wrong. Please try again.'
    }
    password.value = ''
  } finally {
    loading.value = false
  }
}

watch(email, () => {
  if (fieldErrors.value.email) fieldErrors.value.email = ''
})
watch(password, () => {
  if (fieldErrors.value.password) fieldErrors.value.password = ''
})
</script>

<style scoped>
.login-container {
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
  display: block;
}

.form-section {
  flex: 0 0 50vw;
  width: 50vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 2rem;
}

.login-form {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* Control heights consistently across inputs and button */
  --btn-h: 48px;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin: 0.5rem auto 1.25rem; /* add more space below brand above inputs */
  text-align: center;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 0; /* remove extra spacing so ml-2 controls the separation (half of previous total) */
}

.brand-text {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.025em;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center; /* center children */
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.input-field {
  width: 75%;
  height: calc(var(--btn-h) * 1.0);
  padding: 0 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #ffffff;
  outline: none;
  margin: 0 auto; /* center the fields */
}

.input-field.input-error {
  border-color: #FEE4E2; /* light red border like veritree */
  box-shadow: none; /* no glow */
}

.input-field.input-error:focus {
  border-color: #FEE4E2;
  box-shadow: none;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
}

.forgot-password {
  width: 75%;
  margin: -0.5rem auto 0;
  text-align: right;
}

.field-error {
  display: flex;
  align-items: center;
  color: #6b7280; /* gray-500 text like veritree sample */
  font-size: 0.85rem;
  margin: 0.4rem auto 0;
  width: 75%;
}

.error-icon {
  color: #ef4444; /* red icon */
}

.forgot-link {
  color: #000;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: darkblue;
}

.signin-button {
  width: 75%;
  padding: 0.8rem;
  background-color: #1f2937;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 1rem auto 0;
  display: block;
}

.signin-button:hover:not(:disabled) {
  background-color: #111827;
  transform: translateY(-1px);
}

.signin-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

/* Follow DOM order: brand -> inputs -> forgot -> button */

.error-message {
  width: 75%;
  margin: 0.5rem auto 0.75rem;
  color: #B42318;
  font-size: 0.9rem;
  text-align: left;
  padding: 0.75rem;
  background-color: #FEF3F2; /* softer bg */
  border: 1px solid #FEE4E2; /* subtle border */
  border-radius: 0.5rem;
}

.register-link {
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

/* Light tweaks on narrow screens while preserving 50/50 split */
@media (max-width: 768px) {
  .form-section { padding: 1rem; }
  .login-form { max-width: 360px; gap: 1rem; }
  .brand-text { font-size: 1.5rem; }
}
</style>
