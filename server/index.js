const express = require("express");
const { createNuxt } = require("nuxt");

const app = express();
const port = process.env.PORT || 3000;

async function start() {
  const nuxt = await createNuxt();
  await nuxt.ready();

  app.use(nuxt.render);

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
