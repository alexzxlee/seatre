<template>
  <div class="under-construction-page">
    <div class="construction-overlay">
      <div class="construction-content">
        <h1>Sign Up Now</h1>
        <p>This page is under construction</p>
        <div class="construction-icon">✍️</div>
        <NuxtLink to="/" class="back-home-btn">
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Sign Up Now - Seatre',
  meta: [
    { name: 'description', content: 'Sign Up page under construction' }
  ]
})
</script>

<style scoped>
.under-construction-page {
  min-height: 100vh;
  background-image: url('/images/seatre_102.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.construction-overlay {
  background: rgba(0, 0, 0, 0.7);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.construction-content {
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 500px;
}

.construction-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.construction-content p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.construction-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
}

.back-home-btn {
  display: inline-block;
  background: linear-gradient(45deg, #1e3a8a 0%, #1e40af 40%, #60a5fa 60%, #93c5fd 100%);
  color: white;
  padding: 0.5rem 1.4rem;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0003;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.back-home-btn:hover {
  background: linear-gradient(45deg, #059669 0%, #10b981 40%, #34d399 60%, #6ee7b7 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #0004;
}
</style>