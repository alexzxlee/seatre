<template>
	<div class="login-container">
		<!-- Left side - Image -->
		<div class="image-section">
			<img src="/images/seatre_16.jpg" alt="Seatre Environmental Impact" class="hero-image" />
		</div>
    
		<!-- Right side - Registration Form -->
		<div class="form-section">
			<div class="login-form">
				<!-- Registration Form -->
				<form @submit.prevent="register" class="form">

					<!-- Brand centered directly above the form -->
					<div class="brand">
						<BrandMark class="logo-link flex items-center justify-center" to="/register" aria-label="Seatre brand" />
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

					<div class="input-group">
						<input 
							v-model="confirmPassword" 
							type="password" 
							placeholder="Confirm Password" 
							required 
							class="input-field"
						/>
					</div>

					<button type="submit" :disabled="loading" class="signin-button">
						{{ loading ? 'Creating Account...' : 'Create Account' }}
					</button>

					<p v-if="error" class="error-message">{{ error }}</p>
					<p v-if="success" class="success-message">{{ success }}</p>

					<div class="login-link">
						<span>Already have an account? </span>
						<NuxtLink to="/login" class="link">Sign in here</NuxtLink>
					</div>
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
const confirmPassword = ref('')
const error = ref(null)
const success = ref(null)
const loading = ref(false)
const apiFetch = useApiFetch()

const register = async () => {
  error.value = null
  success.value = null
  loading.value = true
  
  // Validation
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }
  
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }
  
  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: { 
        email: email.value, 
        password: password.value 
      }
    })
    success.value = 'Account created successfully! You can now sign in.'
    
    // Clear form
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
    
  } catch (err) {
    console.error('Registration failed:', err)
    error.value = 'Registration failed: ' + (err?.data?.message || err?.message || 'Unknown error')
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
  margin: 0.5rem auto 1.25rem;
  text-align: center;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
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
  margin: 0 auto;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
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

.success-message {
  color: #059669;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 0.5rem;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.login-link:hover {
  background: none !important;
}

.login-link span {
  font-weight: 400 !important;
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

/* Hide image and make form full width on mobile */
@media (max-width: 768px) {
  .image-section {
    display: none;
  }
  .form-section { 
    width: 100vw;
    flex: 1 1 100vw;
    padding: 1rem; 
  }
  .login-form { 
    max-width: 360px; 
    gap: 1rem; 
  }
}
</style>