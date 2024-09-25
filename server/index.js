// Import necessary modules using ES module syntax
import express from 'express';
import { createNuxt } from 'nuxt';
import path from 'path';
import { readFileSync } from 'fs';

// Initialize Express and set the port
const app = express();
const port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
const isProd = process.env.NODE_ENV === 'production';

// Read TypeScript configuration
import 'ts-node/register';
const configPath = path.resolve(process.cwd(), 'nuxt.config.ts');
const config = (await import(configPath)).default; // Dynamically import the Nuxt config

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
