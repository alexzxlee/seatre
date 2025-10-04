<template>
  <div class="minimal-layout">
    <slot />
  </div>
  
</template>

<style scoped>
/* Limit effects to this layout only (for login page) */
.minimal-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* prevent scroll inside minimal layout */
}
</style>