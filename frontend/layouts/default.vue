<template>
  <div>
    <Header />
    <main class="pt-26">
      <NuxtPage />  <!-- This will render the content of the current page, such as index.vue -->
    </main>
    <Footer />
  </div>
</template>

<script setup>
// No imports needed for components in /components
</script>

<style>
/* Add some basic styling */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Add a loading indicator */
#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.hidden {
  display: none;
}
</style>