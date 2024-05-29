import "dotenv/config";
import debugCreator from "debug";
import chalk from "chalk";
import express from "express";
import helmet from "helmet";

const debug = debugCreator("ecommerce:server:app");

const app = express();
app.use(helmet());

const startServer = (port: number) => {
  app.listen(port, () => {
    debug(chalk.green(`Listening on port ${chalk.blue(port)}`));
  });
};

export default startServer;
