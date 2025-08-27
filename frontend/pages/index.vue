<template>
	<div>
		<HeroSection />
		<h1>Welcome to the Home Page</h1>
		<p>This is the main content of the home page.</p>
		<p>/index route, SSR-rendered HTML.</p>
		<div>
			<NuxtLink to="/login">Login</NuxtLink> | 
			<NuxtLink to="/dashboard">Dashboard</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
// Public page. No authentication required for home page.
</script>

<style scoped>
h1 { color: #333; }
a { color: #007bff; text-decoration: none; margin: 0 10px; }
a:hover { text-decoration: underline; }
</style>
