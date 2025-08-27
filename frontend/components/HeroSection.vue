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
    </div>
    <div class="hero-overlay">
      <h1>Remove a ton of plastics.<br>Clean Ocean.</h1>
      <p>When you sign up for our newsletter, we'll remove a verified ton of plastic.</p>
      <button class="hero-btn">Sign Up Now</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const videos = [
  'ocean1.mp4',
  'ocean2.mp4',
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
  margin-top: 90px; /* offset for fixed header */
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
.hero-overlay {
  position: relative;
  z-index: 3;
  color: #fff;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background: #0a6cff;
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 2.2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px #0003;
  transition: background 0.2s;
}
.hero-btn:hover {
  background: #094bb5;
}
</style>
