<template>
	<div>
		<HeroSection />
    <ImpactHighlights />
    <LatestArticles :articles="articles" />
    <CollectiveImpact />
    <NewsletterSignup />
    <CompanyLogos/>
	</div>
</template>

<script setup>
// Public page. No authentication required for home page.
import HeroSection from '~/components/HeroSection.vue'
import ImpactHighlights from '~/components/ImpactHighlights.vue'
import LatestArticles from '~/components/LatestArticles.vue'
import NewsletterSignup from '~/components/NewsletterSignup.vue'
import CollectiveImpact from '~/components/CollectiveImpact.vue'
import CompanyLogos from '~/components/CompanyLogos.vue'

const articles = [
    {
    title: 'Dangerous plastic hotspots map',
    to: '/articles/plastic-risk-map',
    image: '/images/seatre_11.jpg',
    excerpt: 'A global “plastic risk map” shows danger peaks where marine life is densest, not only where trash is visible.'
  },
  {
    title: '27 million tons of nanoplastics in the North Atlantic',
    to: '/articles/north-atlantic-nanoplastics',
    image: '/images/seatre_12.jpg',
    excerpt: 'Tiny plastic particles small enough to enter cells are widespread across the North Atlantic.'
  },
  {
    title: 'Plastics as a global health crisis',
    to: '/articles/plastics-global-health-crisis',
    image: '/images/seatre_13.jpg',
    excerpt: 'Report estimates a $1.5T yearly health burden from plastics and calls for a treaty to cut use.'
  },
  {
    title: 'Pacific garbage patch surge hits Hawaii',
    to: '/articles/pacific-garbage-patch-hawaii',
    image: '/images/seatre_14.jpg',
    excerpt: 'Currents pushed debris to Kauai; volunteers removed a record 81 tons, mostly nets and ropes.'
  }
]
</script>

<style scoped>
h1 { color: #333; }
a { color: #007bff; text-decoration: none; margin: 0 10px; }
a:hover { text-decoration: underline; }
</style>
