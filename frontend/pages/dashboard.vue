<template>
	<div>
		<h1>Dashboard</h1>
		<div v-if="pending">Loading user info...</div>
		<div v-else-if="error">Not authenticated. Redirecting... ( Error: {{ error?.message || error }} ) </div>
		<div v-else-if="user">
			<h2>Welcome, {{ user.username }}!</h2>
			<p>Role: {{ user.role }}</p>
			<button @click="logout">Logout</button>
		</div>
	</div>
</template>

<script setup>
const { data, pending, error } = await useFetch('/api/auth/me', { credentials: 'include' });
const user = computed(() => data.value);

if (!pending.value && error.value) {
	await navigateTo('/login');
}

const logout = async () => {
	try {
		await $fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
		await navigateTo('/login');
	} catch (err) {
		console.error('Logout failed:', err);
	}
}
</script>

<style scoped>
h1 { color: #333; }
button { padding: 10px 20px; margin: 10px 0; cursor: pointer; }
</style>
