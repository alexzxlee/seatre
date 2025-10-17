<template>
	<div class="dashboard-container">
		<!-- Header -->
		<header class="dashboard-header">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<div class="flex items-center">
						<BrandMark class="h-8 w-auto" />
						<h1 class="ml-4 text-xl font-semibold text-gray-900">Dashboard</h1>
					</div>
					<div class="flex items-center space-x-4">
						<ClientOnly>
							<div v-if="user" class="text-sm text-gray-700">
								Welcome, <span class="font-medium">{{ user.email.split('@')[0] }}</span>
								<span class="ml-2 px-2 py-1 text-xs font-medium rounded-full" 
									  :class="user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'">
									{{ user.role }}
								</span>
							</div>
							<template #fallback>
								<div class="text-sm text-gray-700">
									Welcome, <span class="font-medium opacity-0">loading</span>
									<span class="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 opacity-0">
										user
									</span>
								</div>
							</template>
						</ClientOnly>
						<button @click="logout" class="logout-btn px-3 py-1 text-sm rounded transition-colors cursor-pointer">
							Logout
						</button>
					</div>
				</div>
			</div>
		</header>

		<!-- Client-only content to avoid SSR hydration mismatches on refresh -->
		<ClientOnly>
			<!-- Loading State -->
			<div v-if="pending" class="flex items-center justify-center min-h-[50vh]">
				<div class="text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
					<p class="mt-4 text-gray-600">Loading your dashboard...</p>
				</div>
			</div>

			<!-- Error State -->
			<div v-else-if="error" class="flex items-center justify-center min-h-[50vh]">
				<div class="text-center">
					<Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
					<p class="text-gray-600">Authentication required. Redirecting...</p>
				</div>
			</div>

			<!-- Main Dashboard -->
			<main v-else-if="user" class="dashboard-main">
			<!-- Stats Overview -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-2 bg-blue-100 rounded-lg">
							<Icon name="heroicons:globe-americas" class="w-6 h-6 text-blue-600" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Ocean Projects</p>
							<p class="text-2xl font-semibold text-gray-900">142</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-2 bg-green-100 rounded-lg">
							<Icon name="heroicons:chart-bar-square" class="w-6 h-6 text-green-600" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">CO₂ Captured</p>
							<p class="text-2xl font-semibold text-gray-900">2.4M</p>
							<p class="text-xs text-gray-500">tons this year</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-2 bg-cyan-100 rounded-lg">
							<Icon name="heroicons:beaker" class="w-6 h-6 text-cyan-600" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Plastic Removed</p>
							<p class="text-2xl font-semibold text-gray-900">847K</p>
							<p class="text-xs text-gray-500">kg this month</p>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center">
						<div class="p-2 bg-purple-100 rounded-lg">
							<Icon name="heroicons:users" class="w-6 h-6 text-purple-600" />
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-600">Active Users</p>
							<p class="text-2xl font-semibold text-gray-900">12.5K</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Recent Activity & Quick Actions -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Recent Projects -->
				<div class="lg:col-span-2 bg-white rounded-lg shadow">
					<div class="px-6 py-4 border-b border-gray-200">
						<h3 class="text-lg font-medium text-gray-900">Recent Projects</h3>
					</div>
					<div class="p-6">
						<div class="space-y-4">
							<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div class="flex items-center space-x-4">
									<div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
										<Icon name="heroicons:globe-americas" class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="font-medium text-gray-900">Pacific Cleanup Initiative</p>
										<p class="text-sm text-gray-600">North Pacific Gyre • 234 tons removed</p>
									</div>
								</div>
								<span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
							</div>

							<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div class="flex items-center space-x-4">
									<div class="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
										<Icon name="heroicons:beaker" class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="font-medium text-gray-900">Kelp Forest Restoration</p>
										<p class="text-sm text-gray-600">California Coast • 45 hectares restored</p>
									</div>
								</div>
								<span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Monitoring</span>
							</div>

							<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
								<div class="flex items-center space-x-4">
									<div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
										<Icon name="heroicons:chart-bar-square" class="w-5 h-5 text-white" />
									</div>
									<div>
										<p class="font-medium text-gray-900">Coral Reef Protection</p>
										<p class="text-sm text-gray-600">Great Barrier Reef • 12 sites protected</p>
									</div>
								</div>
								<span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Planning</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="bg-white rounded-lg shadow">
					<div class="px-6 py-4 border-b border-gray-200">
						<h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
					</div>
					<div class="p-6 space-y-4">
						<button class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							<Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
							New Project
						</button>
						
						<button class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							<Icon name="heroicons:chart-bar" class="w-5 h-5 mr-2" />
							View Analytics
						</button>
						
						<button class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							<Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
							Generate Report
						</button>
						
						<button class="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							<Icon name="heroicons:cog-6-tooth" class="w-5 h-5 mr-2" />
							Settings
						</button>
					</div>
				</div>
			</div>

			<!-- Impact Visualization -->
			<div class="mt-8 bg-white rounded-lg shadow">
				<div class="px-6 py-4 border-b border-gray-200">
					<h3 class="text-lg font-medium text-gray-900">Environmental Impact This Month</h3>
				</div>
				<div class="p-6">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="text-center">
							<div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Icon name="heroicons:globe-americas" class="w-8 h-8 text-blue-600" />
							</div>
							<h4 class="text-lg font-semibold text-gray-900">Ocean Health</h4>
							<p class="text-3xl font-bold text-blue-600 mt-2">94%</p>
							<p class="text-sm text-gray-600">Improvement in tracked areas</p>
						</div>
						
						<div class="text-center">
							<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Icon name="lucide:leaf" class="w-8 h-8 text-green-600" />
							</div>
							<h4 class="text-lg font-semibold text-gray-900">Carbon Offset</h4>
							<p class="text-3xl font-bold text-green-600 mt-2">156K</p>
							<p class="text-sm text-gray-600">tons CO₂ equivalent</p>
						</div>
						
						<div class="text-center">
							<div class="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<Icon name="heroicons:beaker" class="w-8 h-8 text-cyan-600" />
							</div>
							<h4 class="text-lg font-semibold text-gray-900">Waste Removed</h4>
							<p class="text-3xl font-bold text-cyan-600 mt-2">2.1M</p>
							<p class="text-sm text-gray-600">kg of plastic and debris</p>
						</div>
					</div>
				</div>
			</div>
			</main>

			<template #fallback>
				<!-- Minimal placeholder on server to keep layout stable; replaced on client -->
				<div class="min-h-[50vh]"></div>
			</template>
		</ClientOnly>
	</div>
</template>

<script setup>
// No layout needed - dashboard has its own complete structure
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Simple client-side only auth check - fixes refresh issue
const { data: user, pending, error } = useLazyFetch('/auth/me', {
	baseURL: useApiBase(),
	credentials: 'include',
	server: false, // Client-only = no SSR cookie issues. Otherwise SSR call to /auth/me fails → shows "Authentication required"
	default: () => null
});

watch(error, (val) => {
		if (val) {
			const toast = useToast();
			toast.add({ title: 'Authentication required. Please log in!', color: 'error', duration: 2500 });
			navigateTo('/login');
		}
});

const logout = async () => {
	try {
		const apiFetch = useApiFetch()
		await apiFetch('/auth/logout', { method: 'POST' });
		const toast = useToast();
		toast.add({ title: 'Logged out successfully', color: 'success', duration: 1500 });
		await navigateTo('/login');
	} catch (err) {
		console.error('Logout failed:', err);
	}
}
</script>

<style scoped>
/* Simple clean dashboard */
.dashboard-container {
  min-height: 100vh;
  background-color: #f9fafb;
}

.dashboard-header {
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e5e7eb;
  /* Fix header flickering */
  overflow: hidden;
  width: 100%;
	min-height: 4rem; /* ensure same height server/client */
}

.dashboard-main {
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

.logout-btn {
  color: seagreen;
}

.logout-btn:hover {
  color: #dc2626; /* red-600 */
}
</style>
