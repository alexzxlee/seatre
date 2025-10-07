<template>
  <section class="bg-slate-900 text-white py-16">
    <div class="max-w-5xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-center md:gap-10">
        <div class="flex-1 mb-8 md:mb-0">
          <h2 class="text-4xl font-extrabold mb-4">Sign Up for Our Newsletter</h2>
          <p class="mb-6 text-lg">Receive updates on new ocean-cleaning projects and our restoration initiatives—delivered straight to your inbox.</p>
          <!-- Optional: add a decorative SVG line here if you want -->
        </div>
        <form class="newsletter-form flex flex-col md:flex-row items-center gap-4 flex-1">
          <input
            type="email"
            placeholder="Email"
            class="newsletter-input rounded-full px-6 py-3 text-slate-900 bg-white w-full md:w-auto flex-1 md:flex-initial focus:outline-none"
          />
          <button
            type="submit"
            class="newsletter-button rounded-full border border-white px-8 py-3 font-semibold hover:bg-white hover:text-slate-900 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
      <p class="mt-8 text-xs text-slate-400">
        You may unsubscribe at any time using the link in our newsletter. I agree to receive your newsletters and accept the data privacy statement.
      </p>
    </div>
  </section>
</template>