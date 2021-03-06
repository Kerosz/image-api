// packages
import express from "express";
import chalk from "chalk";
// internals
import loaders from "./loaders/index";
import config from "./config/index";

// Creates express server
const app = express();

function init() {
  loaders({ expressApp: app });

  app
    .listen(config.port, () => {
      console.info(
        "%s App started on %s:%d in %s mode",
        chalk.green("✓"),
        config.host,
        config.port,
        config.env
      );
    })
    .on("error", (error) => {
      console.error(error);
      process.exit(1);
    });
}

init();

export default app;
