<template>
  <div class="under-construction-page">
    <div class="construction-overlay">
      <div class="construction-content">
        <h1>Careers</h1>
        <p>This page is under construction</p>
        <div class="construction-icon">💼</div>
        <NuxtLink to="/" class="back-home-btn">
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Careers - Seatre',
  meta: [
    { name: 'description', content: 'Careers page under construction' }
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
  background: #0a6cff;
  color: white;
  padding: 1rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
}

.back-home-btn:hover {
  background: #0056d3;
}
</style>