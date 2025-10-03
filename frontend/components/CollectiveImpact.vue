<template>
  <section class="collective-impact-section py-16 bg-[#fcf8f3] text-slate-900" ref="sectionRef">
    <div class="container mx-auto max-w-screen-2xl px-6 md:px-12">
      <h2 class="text-5xl md:text-6xl font-extrabold text-center mb-4">Our Collective Impact</h2>
      <p class="text-center text-lg text-slate-700 mb-12 max-w-6xl mx-auto">
        Our community of change-makers is dedicated to restoring our ecosystems, protecting habitats, boosting wildlife, and sequestering carbon.
        Together, we're driving impactful climate solutions for a healthier planet.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <!-- Hectares Restored -->
        <div class="flex flex-col items-start">
          <div class="impact-graph">
            <div class="y-axis"></div>
            <div class="impact-bar-outer">
              <div class="impact-bar bar-blue-1" :style="barStyleY(hectaresPercent, 80)"></div>
              <div class="x-axis"></div>
            </div>
            <div class="impact-number">{{ hectaresDisplay }}</div>
          </div>
          <div class="text-3xl md:text-4xl font-extrabold mt-4 mb-2 impact-title">Kilograms Collected</div>
          <div class="text-base impact-desc">Total plastic and marine debris removed from the ocean-equivalent to thousands of bottles and bags.</div>
        </div>
        <!-- Species Identified -->
        <div class="flex flex-col items-start">
          <div class="impact-graph">
            <div class="y-axis"></div>
            <div class="impact-bar-outer">
              <div class="impact-bar bar-blue-2" :style="barStyleY(speciesPercent, 40)"></div>
              <div class="x-axis"></div>
            </div>
            <div class="impact-number">{{ speciesDisplay }}</div>
          </div>
          <div class="text-3xl md:text-4xl font-extrabold mt-4 mb-2 impact-title">Biodiversity Monitored</div>
          <div class="text-base impact-desc">Tracking the presence and health of marine life in cleaned areas.</div>
        </div>
        <!-- Evidence Uploaded -->
        <div class="flex flex-col items-start">
          <div class="impact-graph">
            <div class="y-axis"></div>
            <div class="impact-bar-outer">
              <div class="impact-bar bar-blue-3" :style="barStyleY(evidencePercent, 80)"></div>
              <div class="x-axis"></div>
            </div>
            <div class="impact-number">{{ evidenceDisplay }}</div>
          </div>
          <div class="text-3xl md:text-4xl font-extrabold mt-4 mb-2 impact-title">Hotspots Mapped</div>
          <div class="text-base impact-desc">On-the-water cleanups verified with images, GPS tracks, and satellite imagery.</div>
        </div>
      </div>
      <div class="flex justify-center mt-6">
        <NuxtLink to="/explore-projects" class="explore-btn inline-flex items-center gap-2">
          Explore Projects <Icon name="lucide:arrow-right" size="1.2em" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'


const hectares = 7512
const species = 523
const evidence = 72602

const hectaresDisplay = ref(0)
const speciesDisplay = ref(0)
const evidenceDisplay = ref(0)

const hectaresPercent = ref(0)
const speciesPercent = ref(0)
const evidencePercent = ref(0)

const sectionRef = ref(null)
const hasAnimated = ref(false)
let observer = null


function barStyleY(percent, maxHeightPx) {
  return {
    height: (percent / 100 * maxHeightPx) + 'px',
    width: '100%',
    minHeight: '0',
    maxHeight: maxHeightPx + 'px',
    transition: 'height 1.2s cubic-bezier(.4,2,.6,1)',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 1
  }
}

function animateValue(refValue, target, duration = 1200) {
  const start = 0
  const startTime = performance.now()
  function animate(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    refValue.value = Math.floor(progress * target)
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      refValue.value = target
    }
  }
  requestAnimationFrame(animate)
}


function animateBar(refPercent, targetPx, maxPx, duration = 1200) {
  const startTime = performance.now()
  function animate(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    refPercent.value = Math.floor((progress * targetPx / maxPx) * 100)
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      refPercent.value = Math.floor((targetPx / maxPx) * 100)
    }
  }
  requestAnimationFrame(animate)
}


// For y direction, set all bars to same max height (e.g. 80px)
const maxHeights = {
  hectares: 80,
  species: 40,
  evidence: 80
}


function startAnimation() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  animateValue(hectaresDisplay, hectares)
  animateValue(speciesDisplay, species)
  animateValue(evidenceDisplay, evidence)
  // Only fill Hectares bar to 65% of its max height
  animateBar(hectaresPercent, maxHeights.hectares * 0.65, maxHeights.hectares)
  animateBar(speciesPercent, maxHeights.species, maxHeights.hectares)
  animateBar(evidencePercent, maxHeights.evidence, maxHeights.hectares)
}

function resetAnimation() {
  hasAnimated.value = false
  hectaresDisplay.value = 0
  speciesDisplay.value = 0
  evidenceDisplay.value = 0
  hectaresPercent.value = 0
  speciesPercent.value = 0
  evidencePercent.value = 0
}

onMounted(() => {
  observer = new window.IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startAnimation()
      } else {
        resetAnimation()
      }
    },
    { threshold: 0.3 }
  )
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer && sectionRef.value) {
    observer.unobserve(sectionRef.value)
  }
})
</script>

<style scoped>
.collective-impact-section {
  background: url('/images/seatre_7.jpg') center/cover no-repeat;
}
.impact-graph {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 110px;
  margin-bottom: 0.5rem;
}
.y-axis {
  width: 2px;
  height: 109px;
  /* 100px bar + ~16px for number height */
  background: #222;
  position: relative;
  z-index: 2;
}
.impact-bar-outer {
  position: relative;
  width: 180px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-left: 0;
}
.impact-bar {
  border-radius: 0 0 0.25rem 0.25rem;
  min-height: 0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.bar-blue-1 {
  background: linear-gradient(180deg, #2563eb 60%, #1e40af 100%);
}
.bar-blue-2 {
  background: linear-gradient(180deg, #1e3a8a 60%, #1e293b 100%);
}
.bar-blue-3 {
  background: linear-gradient(180deg, #60a5fa 60%, #1d4ed8 100%);
}
.x-axis {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #222;
  z-index: 2;
}
.impact-number {
  position: absolute;
  top: -2px;
  left: 8px;
  font-size: 1.35rem;
  font-weight: 700;
  color: #222;
  z-index: 3;
  background: transparent;
  margin-left: 0;
  padding: 0 0.25rem;
  line-height: 1;
}
.impact-title {
  margin-left: 0;
  color: #111827;
}
.impact-desc {
  margin-left: 0;
  color: black;
}
.explore-btn {
  pointer-events: auto;
  background: linear-gradient(45deg, #1e3a8a 0%, #1e40af 40%, #60a5fa 60%, #93c5fd 100%);
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.5rem 1.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0003;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.explore-btn:hover {
  background: linear-gradient(45deg, #059669 0%, #10b981 40%, #34d399 60%, #6ee7b7 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #0004;
}
</style>
