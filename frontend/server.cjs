// Wrapper to run Nuxt SSR on platforms that don't accept .mjs as the startup file (e.g., some cPanel setups)
// Usage in cPanel "Setup Node.js App": set the Startup file to "server.cjs" after you run `npm run build` in the frontend folder.

(async () => {
  // Ensure Nitro respects common hosting env vars
  process.env.NITRO_PORT = process.env.PORT || process.env.NITRO_PORT || '3000'
  process.env.NITRO_HOST = process.env.HOST || process.env.NITRO_HOST || '0.0.0.0'

  try {
    await import('./.output/server/index.mjs')
  } catch (err) {
    console.error('[server.cjs] Failed to start Nuxt server from .output/server/index.mjs')
    console.error(err)
    process.exit(1)
  }
})()
