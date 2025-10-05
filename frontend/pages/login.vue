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
        <form @submit.prevent="login" class="form">

          <!-- Brand centered directly above the button -->
          <div class="brand">
            <BrandMark class="logo-link flex items-center justify-center" to="/login" aria-label="Seatre brand" />
          </div>

          <div class="input-group">
						<input 
							v-model="email" 
							type="email"
							placeholder="Email" 
							required 
							class="input-field"
						/>
					</div>
					
					<div class="input-group">
						<input 
							v-model="password" 
							type="password" 
							placeholder="Password" 
							required 
							class="input-field"
						/>
					</div>

					<div class="forgot-password">
						<a href="#" class="forgot-link">Forgot password?</a>
					</div>

					<button type="submit" :disabled="loading" class="signin-button">
						{{ loading ? 'Signing In...' : 'Sign In' }}
					</button>

					<p v-if="error" class="error-message">{{ error }}</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
// Use minimal layout (no header/footer)
definePageMeta({
  layout: 'minimal'
})

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const apiFetch = useApiFetch()

const login = async () => {
  error.value = null
  loading.value = true
  try {
    const response = await apiFetch('/auth/login', {
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
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #ffffff;
  outline: none;
  margin: 0 auto; /* center the fields */
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
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

/* Light tweaks on narrow screens while preserving 50/50 split */
@media (max-width: 768px) {
  .form-section { padding: 1rem; }
  .login-form { max-width: 360px; gap: 1rem; }
  .brand-text { font-size: 1.5rem; }
}
</style>
