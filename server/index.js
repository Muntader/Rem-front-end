const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// router
const serverRouter = require("./router/server");
const templatesRouter = require("./router/templates");

// database
const migration = require("./database/dbconnect");
const { Nuxt, Builder } = require("nuxt");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Express GET endpoint

  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true
    })
  );
  app.use("/api/servers/", serverRouter);
  app.use("/api/templates/", templatesRouter);
  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
