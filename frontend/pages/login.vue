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
            <!-- Intentionally non-clickable brand on the login page -->
            <div class="logo-link flex items-center justify-center" aria-label="Seatre brand">
              <span class="logo-svg">
                <span class="logo-rotate">
                  <span class="logo-pulse-fade">
                    <svg width="40" height="40" viewBox="2.8 -3.1 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g fill="darkblue" font-family="monospace" font-size="9.5" font-weight="700" text-anchor="middle">
                        <!-- Top (horizontal) -->
                        <text x="17.5" y="7" transform="rotate(90 20 7)">s</text>
                        <!-- Top-right (135°) -->
                        <text x="29" y="15" transform="rotate(135 31 11)">s</text>
                        <!-- Right (vertical) -->
                        <text x="36" y="20">s</text>
                        <!-- Bottom-right (225°) -->
                        <text x="32" y="33.5" transform="rotate(225 31 29)">s</text>
                        <!-- Bottom (horizontal) -->
                        <text x="18" y="33" transform="rotate(90 20 33)">s</text>
                        <!-- Bottom-left (315°) -->
                        <text x="14" y="33" transform="rotate(315 9 29)">s</text>
                        <!-- Left (vertical) -->
                        <text x="9.5" y="20">s</text>
                        <!-- Top-left (45°) -->
                        <text x="10.5" y="8.5" transform="rotate(45 9 11)">s</text>
                        <!-- Inner ring -->
                        <text x="18" y="13.5" transform="rotate(90 20 13.5)">s</text>
                        <text x="29" y="20">s</text>
                        <text x="17.5" y="26.5" transform="rotate(90 20 26.5)">s</text>
                        <text x="16.5" y="20">s</text>
                      </g>
                    </svg>
                  </span>
                </span>
              </span>
              <span class="brand-text ml-2">sea<span style="color: seagreen">tre</span></span>
            </div>
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

.logo-svg, .logo-rotate, .logo-pulse-fade { 
  display: flex; 
  align-items: center; 
  height: 48px; 
}

.logo-rotate { 
  animation: logo-rotate-pause 25s linear infinite; 
}

.logo-pulse-fade { 
  animation: logo-pulse-fade-pause 25s ease-in-out infinite; 
}

.brand-text {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: -0.025em;
}

@keyframes logo-rotate-pause {
  0% { transform: rotate(0); }
  60% { transform: rotate(1800deg); }
  100% { transform: rotate(1800deg); }
}

@keyframes logo-pulse-fade-pause {
  0% { transform: scale(1); opacity: 1; }
  12% { transform: scale(1.15); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
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
