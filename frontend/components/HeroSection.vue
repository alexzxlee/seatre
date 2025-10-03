<template>
  <section class="hero-section">
    <div class="video-carousel">
      <video
        v-for="(video, idx) in videos"
        :key="video"
        :src="`/` + video"
        v-show="current === idx"
        autoplay
        muted
        loop
        playsinline
        class="hero-video"
      ></video>
      <button class="arrow left" @click="prevVideo">
        <svg class="chevron" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button class="arrow right" @click="nextVideo">
        <svg class="chevron" viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
      </button>
      
      <!-- Carousel indicators for narrow screens -->
      <div class="carousel-indicators">
        <button 
          v-for="(video, idx) in videos" 
          :key="`indicator-${idx}`"
          class="carousel-indicator"
          :class="{ active: current === idx }"
          @click="current = idx"
        ></button>
      </div>
    </div>
    <div class="hero-overlay px-60">
      <template v-if="current === 0">
        <h1>Remove a ton of plastics.<br>Clean Ocean.</h1>
        <p>When you sign up for our newsletter, we'll remove a verified ton of plastic.</p>
        <NuxtLink to="/sign-up-now" class="hero-btn inline-flex items-center gap-2">
          Sign Up Now <Icon name="lucide:arrow-right" size="1.2em" />
        </NuxtLink>
      </template>
      <template v-else-if="current === 1">
        <h1>Sustainability Projects<br>You Can Trust</h1>
        <p>We don't just clean oceans. We manage, monitor, measure and report on them.</p>
        <button class="hero-btn inline-flex items-center gap-2">Explore Projects <span class="i-lucide:arrow-right size-4"></span></button>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const videos = [
  'videos/ocean_2.mp4',
  'videos/ocean_1.mp4',
  // Add more video filenames as needed
]
const current = ref(0)
const prevVideo = () => {
  current.value = (current.value - 1 + videos.length) % videos.length
}
const nextVideo = () => {
  current.value = (current.value + 1) % videos.length
}
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  max-height: 80vh;
  margin-top: 24px; /* offset for fixed header */
}
.video-carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0; left: 0;
  z-index: 1;
  aspect-ratio: 16/9;
  overflow: visible;
}
.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0; left: 0;
  z-index: 1;
  aspect-ratio: 16/9;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  padding: 0;
  box-shadow: none;
  transition: filter 0.2s;
}
.arrow.left { left: 2vw; }
.arrow.right { right: 2vw; }
.arrow:focus {
  outline: none;
}
.arrow:hover .chevron {
  filter: drop-shadow(0 0 6px #fff);
}
.chevron {
  width: 48px;
  height: 48px;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  display: block;
}

/* Carousel indicators */
.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  gap: 12px;
  z-index: 3;
}

.carousel-indicator {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.carousel-indicator.active {
  background: rgba(255, 255, 255, 0.9);
}

.carousel-indicator:hover {
  background: rgba(255, 255, 255, 0.7);
}
.hero-overlay {
  position: relative;
  z-index: 3;
  color: #fff;
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  pointer-events: none;
}
.hero-overlay h1 {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0 2px 8px #000a;
  margin-bottom: 1rem;
}
.hero-overlay p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-shadow: 0 1px 6px #000a;
}
.hero-btn {
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
.hero-btn:hover {
  background: linear-gradient(45deg, #059669 0%, #10b981 40%, #34d399 60%, #6ee7b7 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px #0004;
}

@media (max-width: 1150px) {
  .hero-overlay {
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
@media (max-width: 1000px) {
  .hero-overlay {
    padding-left: 9rem;
    padding-right: 9rem;
  }
  .hero-overlay h1 {
    font-size: 2rem;
  }
  .hero-overlay p {
    font-size: 1rem;
  }
}
@media (max-width: 850px) {
  .hero-overlay {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}

/* Hide arrows and show carousel indicators on narrow screens */
@media (max-width: 850px) {
  .arrow {
    display: none !important;
  }
  
  .carousel-indicators {
    display: flex !important;
  }
}

@media (max-width: 600px) {
  .hero-overlay h1 {
    font-size: 1.5rem;
  }
  .hero-overlay p {
    font-size: 1rem;
  }
  .hero-btn {
    font-size: 0.9rem;
  }
}
</style>
