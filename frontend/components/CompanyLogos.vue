<template>
  <section class="company-logos-section py-32 bg-[#fcf8f3] text-slate-900">
    <div class="container max-w-screen-2xl">
      <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-4">Recognized by<br>Respected Institutions</h2>
      <p class="text-center text-lg text-slate-600 mb-10">Celebrated and acknowledged by industry-leading institutions and outlets.</p>
      <div class="relative overflow-x-hidden">
        <div class="logos-marquee flex items-center gap-16 animate-marquee">
          <img v-for="logo in logos" :key="logo.alt" :src="logo.src" :alt="logo.alt" class="h-8 md:h-10 grayscale opacity-80 hover:opacity-100 transition-opacity" draggable="false" />
          <!-- Duplicate for seamless loop -->
          <img v-for="logo in logos" :key="logo.alt + '-2'" :src="logo.src" :alt="logo.alt" class="h-8 md:h-10 grayscale opacity-80 hover:opacity-100 transition-opacity" draggable="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  { src: '/logos/fastcompany.svg', alt: 'Fast Company' },
  { src: '/logos/deloitte.svg', alt: 'Deloitte' },
  { src: '/logos/naturetech.svg', alt: 'Nature Tech Collective' },
  { src: '/logos/unecosystem.svg', alt: 'UN Ecosystem Restoration' },
  { src: '/logos/veritree.svg', alt: 'Veritree' },
  { src: '/logos/1torg.svg', alt: '1t.org' },
  { src: '/logos/forbes.svg', alt: 'Forbes' },
  { src: '/logos/tnfd.svg', alt: 'TNFD' },
  { src: '/logos/afr100.svg', alt: 'afr100' },
]
</script>

<style scoped>
.company-logos-section {
  background: url('/images/seatre_6.jpg') 50% 30%/cover no-repeat;
}
.logos-marquee {
  min-width: 200%;
  will-change: transform;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 32s linear infinite;
}
</style>
