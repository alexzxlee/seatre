const express = require("express");
const { createNuxt } = require("nuxt");
const path = require("path");
const { readFileSync } = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
const isProd = process.env.NODE_ENV === 'production';

// Read TypeScript configuration
const nuxtConfig = require('ts-node/register');
const configPath = path.resolve(__dirname, '../nuxt.config.ts');
const config = require(configPath);

async function start() {
  const nuxt = await createNuxt(config);

  if (!isProd) {
    await nuxt.ready();
  }

  app.use(nuxt.render);

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
