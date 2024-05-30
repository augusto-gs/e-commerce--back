import "dotenv/config.js";
import "./server/index.js";
import { startServer } from "./server/app.js";
import connectToDatabase from "./database/index.js";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("ecommerce:server:index");

const port = process.env.PORT ?? 4000;
const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  debug(chalk.red("Missing MongoDB Connection String"));
  process.exit();
}

await connectToDatabase(mongoUrl);
startServer(Number(port));
