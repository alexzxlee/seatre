<!--
How to test this debug page:
1. Start your frontend and backend servers as usual.
2. Log in with any valid user.
3. In your browser, navigate to /debug/user.
  - You should see the cached user’s ID, email, and role.
  - If not authenticated, you’ll be redirected to /login.
  - If you log out and revisit /debug/user, it should show “No user is currently cached.”
-->
<template>
  <div class="debug-user-page">
    <h1 class="text-2xl font-bold mb-4">User Debug Info</h1>
    <div v-if="user">
      <div class="mb-2"><strong>ID:</strong> {{ user.id }}</div>
      <div class="mb-2"><strong>Email:</strong> {{ user.email }}</div>
      <div class="mb-2"><strong>Role:</strong> {{ user.role }}</div>
    </div>
    <div v-else>
      <p class="text-red-600">No user is currently cached.</p>
    </div>
    <div v-if="error" class="text-red-600 mt-2">Error: {{ error }}</div>
  </div>
</template>

<script setup lang="ts">
/**
 * Debug page for viewing cached user and role.
 * Protected by auth middleware. Use to verify SSR/client user state and role propagation.
 * To use: navigate to /debug/user after login.
 */
definePageMeta({
  middleware: ['auth']
})
import { useCurrentUser } from '../../composables/useCurrentUser'
const { user, error } = useCurrentUser()
</script>

<style scoped>
.debug-user-page {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
</style>
