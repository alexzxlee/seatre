<template>
  <footer class="bg-[#101722] text-white py-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-0 w-full min-w-0">
        <!-- B Corp block and commitment text, no Certified/Corporation -->
        <div class="flex flex-row items-center justify-center w-full lg:w-1/2 min-h-[180px] mb-10 lg:mb-0">
          <div class="flex-shrink-0 flex items-center justify-center md:justify-end w-full md:w-[35%] max-w-[200px] h-full sm:ml-34 ml-34">
            <img src="/bcorporation.png" alt="B Corp" class="w-36 h-60 filter invert brightness-200 bcorp-image" style="object-fit:contain;max-width:180px;" />
          </div>
          <div class="flex flex-col justify-center md:items-start h-full md:ml-4 w-full md:w-[65%] md:pl-4 md:pr-4 max-w-[600px] sm:ml-8 mr-36">
            <br><div class="font-bold text-xl sm:text-xl md:text-xl leading-[1.75] mb-2 w-[360px] max-w-[360px] whitespace-pre-line bcorp-text commitment-text" id="commitment-text" style="margin-top:0;">
              This company is committed to<br>
              accountability, transparency,<br>
              and continuous improvement.
            </div><br>
            <div class="border-t-10 border-white mt-2 mb-2 w-full max-w-[285px] bcorp-line"></div>
          </div>
        </div>
        <!-- Links block responsive -->
        <div class="w-full flex flex-col justify-center items-center mx-auto mt-10 lg:w-[75%] lg:ml-14">
          <div class="grid grid-cols-4 gap-8">
            <div>
              <div class="font-bold my-3 pb-2 text-base">Learn More</div>
              <ul class="space-y-5 text-sm">
                <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
                <li><NuxtLink to="/resources">Resources</NuxtLink></li>
                <li><NuxtLink to="/blog">Blog</NuxtLink></li>
              </ul>
            </div>
            <div>
              <div class="font-bold my-3 pb-2 text-base">Company</div>
              <ul class="space-y-5 text-sm">
                <li><NuxtLink to="/about-seatre">About seatre</NuxtLink></li>
                <li><NuxtLink to="/careers">Careers</NuxtLink></li>
                <li><NuxtLink to="/contact">Contact</NuxtLink></li>
                <li><NuxtLink to="/login">Login</NuxtLink></li>
              </ul>
            </div>
            <div>
              <div class="font-bold my-3 pb-2 text-base">Partners</div>
              <ul class="space-y-5 text-sm">
                <li><NuxtLink to="/how-it-works">How it Works</NuxtLink></li>
                <li><NuxtLink to="/explore-projects">Explore Projects</NuxtLink></li>
                <li><NuxtLink to="/case-studies">Case Studies</NuxtLink></li>
              </ul>
            </div>
            <div>
              <div class="font-bold my-3 pb-2 text-base">Connect</div>
              <ul class="space-y-5 text-sm">
                <li>
                  <a href="https://linkedin.com" target="_blank" class="flex items-center gap-2">
                    <Icon name="lucide:linkedin" class="w-5 h-5" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" class="flex items-center gap-2">
                    <Icon name="lucide:instagram" class="w-5 h-5" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" class="flex items-center gap-2">
                    <Icon name="lucide:facebook" class="w-5 h-5" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" class="flex items-center gap-2">
                    <Icon name="lucide:youtube" class="w-5 h-5" /> YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-slate-700 mt-10 pt-6">
        <p class="text-center text-xs text-slate-400">&copy; 2025 seatre. All rights reserved.</p>
        </div>
        <div class="flex justify-center gap-4 mt-2 mb-15">
         <NuxtLink to="/privacy-policy" class="text-xs text-blue-500">Privacy Policy</NuxtLink>
         <NuxtLink to="/terms-of-service" class="text-xs text-blue-500">Terms of Service</NuxtLink>
        </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for static footer
</script>

<style scoped>
@media (max-width: 640px) and (min-width: 500px) {
  .bcorp-text {
    font-size: 1.25rem; /* Adjust font size for small screens */
    width: 290px;
    line-height: 1.65; /* Relative line height (recommended) */
  }
}

@media (max-width: 500px) {
  .bcorp-text {
    font-size: 1rem; /* Smaller font for very small screens */
    width: 250px;
    line-height: 1.9;
  }
  .bcorp-image {
    width: 135px; /* Smaller image for very small screens */
    height: auto;
  }
  .bcorp-line {
    border-top: 8px solid white; /* Thinner line for very small screens */
    width: 230px;
    margin-top: 13px;
    margin-bottom: 10px;
  }
  /* Keep social media icons at normal size */
  [class*="i-lucide:"] {
    width: 20px !important;
    height: 20px !important;
    min-width: 20px !important;
    min-height: 20px !important;
  }
  
  /* Specific icon targeting */
  .i-lucide\:linkedin,
  .i-lucide\:instagram, 
  .i-lucide\:facebook,
  .i-lucide\:youtube {
    width: 20px !important;
    height: 20px !important;
  }
}
</style>