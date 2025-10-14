<template>
  <div class="minimal-layout">
    <slot />
  </div>
  
</template>

<style scoped>
/* Minimal layout - allow scrolling for dashboard */
.minimal-layout {
  min-height: 100vh;
  width: 100%;
}
</style>