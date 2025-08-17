<template>
  <header>
      <nav>
        <ul>
          <li class="logo-brand">
            <NuxtLink to="/" class="brand">
              <span class="logo-svg">
                <!-- SVG with 's' letters in a round O outline, rotated as requested -->
                <span class="logo-rotate">
                  <span class="logo-pulse-fade">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <!-- Top (horizontal) -->
                    <text x="17.5" y="7" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 7)">s</text>
                    <!-- Top-right (135°) -->
                    <text x="29" y="15" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(135 31 11)">s</text>
                    <!-- Right (vertical) -->
                    <text x="36" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Bottom-right (225°) -->
                    <text x="32" y="33.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(225 31 29)">s</text>
                    <!-- Bottom (horizontal) -->
                    <text x="18" y="33" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 33)">s</text>
                    <!-- Bottom-left (315°) -->
                    <text x="14" y="33" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(315 9 29)">s</text>
                    <!-- Left (vertical) -->
                    <text x="9.5" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Top-left (45°) -->
                    <text x="10.5" y="8.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(45 9 11)">s</text>
                    <!-- Inner ring (same size) -->
                    <!-- Top -->
                    <text x="18" y="13.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 13.5)">s</text>
                    <!-- Right -->
                    <text x="29" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                    <!-- Bottom -->
                    <text x="17.5" y="26.5" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue" transform="rotate(90 20 26.5)">s</text>
                    <!-- Left -->
                    <text x="16.5" y="20" text-anchor="middle" font-size="9.5" font-family="monospace" fill="darkblue">s</text>
                  </g>
                    </svg>
                  </span>
                </span>
                <span class="brand-text">seatre</span>
              </span>
            </NuxtLink>
          </li>
          <li class="login-link"><NuxtLink to="/login">Login</NuxtLink></li>
        </ul>
	  </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.logo-brand {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 48px;
}

.logo-svg {
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 48px;
}
.logo-rotate {
  display: flex;
  align-items: center;
  animation: logo-rotate 4s linear infinite;
}
.logo-pulse-fade {
  display: flex;
  align-items: center;
  animation: logo-pulse-fade 2s ease-in-out infinite;
}

@keyframes logo-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes logo-pulse-fade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes logo-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

header {
  position: relative;
  background: rgba(255, 255, 255, 0.2); /* semi-transparent */
  backdrop-filter: blur(10px); /* glass effect */
  color: white;
  padding: 1rem 7.5rem;
  overflow: hidden;
}


header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('/seatre_2.jpg') center/cover no-repeat;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}

nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
  padding: 0;
}

nav a {
  color: darkblue;
  text-decoration: none;
  position: relative;
  z-index: 2;
}
.brand-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: darkblue;
  line-height: 1;
  display: flex;
  align-items: center;
  height: 48px;
  margin-left: 0.6rem;
}
.login-link {
  margin-left: auto;
  font-size:1rem;
}
</style>