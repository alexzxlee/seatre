<template>
  <section class="impact-bg py-16 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
    <div class="container mx-auto max-w-screen-2xl px-6 md:px-12">
      <div class="grid gap-10 md:grid-cols-3">
        <!-- Impact You Can See -->
        <div class="impact-card group flex flex-col justify-center items-start p-8 rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
          <span class="absolute right-6 bottom-6 opacity-20 animate-float">
            <!-- Animated wave SVG -->
            <svg width="60" height="32" viewBox="0 0 60 32" fill="none"><path d="M0 16 Q15 32 30 16 T60 16" stroke="#0ea5e9" stroke-width="4" fill="none"><animate attributeName="d" values="M0 16 Q15 32 30 16 T60 16;M0 16 Q15 0 30 16 T60 16;M0 16 Q15 32 30 16 T60 16" dur="2s" repeatCount="indefinite"/></path></svg>
          </span>
          <h2 class="text-3xl font-extrabold mb-4">Impact You Can See</h2>
          <p class="mb-6 text-base text-slate-700">Offering verified ocean-cleaning projects that show clear impact with real-time, on-the-water data.</p>
          <NuxtLink to="/how-it-works" class="inline-flex items-center gap-2 border border-slate-400 rounded-full px-5 pr-8 md:pr-5 py-2 font-semibold text-base hover:bg-slate-100 transition z-10 mr-6 md:mr-0">
            How It Works <Icon name="lucide:arrow-right" size="1.2em" />
          </NuxtLink>
        </div>
        <!-- Impact You Can Measure -->
        <div class="impact-card group flex flex-col justify-center items-start p-8 rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
          <span class="absolute right-6 bottom-6 opacity-20 animate-spin-slow">
            <!-- Animated radar SVG --> 
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="24" stroke="#22c55e" stroke-width="3" fill="none"/>
              <circle cx="28" cy="28" r="12" stroke="#22c55e" stroke-width="2" fill="none"/>
              <circle cx="28" cy="16" r="3" fill="#22c55e">
                <animate attributeName="cy" values="16;40;16" dur="2.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </span>
          <h2 class="text-3xl font-extrabold mb-4">Impact You Can Measure</h2>
          <p class="mb-6 text-base text-slate-700">Measuring and monitoring your ocean cleanup data before, during, and after our activity.</p>
          <NuxtLink to="/impact" class="inline-flex items-center gap-2 border border-slate-400 rounded-full px-5 pr-8 md:pr-5 py-2 font-semibold text-base hover:bg-slate-100 transition z-10 mr-6 md:mr-0">
            Explore Impact <Icon name="lucide:arrow-right" size="1.2em" />
          </NuxtLink>
        </div>
        <!-- Impact You Can Share -->
        <div class="impact-card group flex flex-col justify-center items-start p-8 rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
          <span class="absolute right-6 bottom-6 opacity-20 animate-bounce">
            <!-- Animated share/graph SVG -->
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
              <polyline points="6,34 22,18 34,28 50,10" stroke="#6366f1" stroke-width="4" fill="none"/>
              <circle cx="6" cy="34" r="3" fill="#6366f1"/>
              <circle cx="22" cy="18" r="3" fill="#6366f1"/>
              <circle cx="34" cy="28" r="3" fill="#6366f1"/>
              <circle cx="50" cy="10" r="3" fill="#6366f1"/>
            </svg>
          </span>
          <h2 class="text-3xl font-extrabold mb-4">Impact You Can Share</h2>
          <p class="mb-6 text-base text-slate-700">View and share your impact through a custom digital report generated with real-time stats, progress updates, and more.</p>
          <NuxtLink to="/visualization" class="inline-flex items-center gap-2 border border-slate-400 rounded-full px-5 pr-8 md:pr-5 py-2 font-semibold text-base hover:bg-slate-100 transition z-10 mr-6 md:mr-0">
            Our Data Visualization <Icon name="lucide:arrow-right" size="1.2em" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  </template>
<style scoped>
.impact-card {
  box-shadow: 0 4px 32px 0 #0ea5e91a, 0 1.5px 6px 0 #0001;
  background: linear-gradient(135deg, #f8fafc 0%, #fff 100%);
}
.animate-float {
  animation: floatWaves 2.5s ease-in-out infinite;
}
@keyframes floatWaves {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-spin-slow {
  animation: spin 6s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
.animate-bounce {
  animation: bounceGraph 2s infinite;
}
@keyframes bounceGraph {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
/* Ensure the animated SVG stays visually separated from the button */
.impact-card span[absolute] {
  pointer-events: none;
}


<script setup>
// No script needed
</script>
