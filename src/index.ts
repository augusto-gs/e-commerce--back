import chalk from "chalk";
import startServer from "./server/app.js";
import "dotenv/config";
import debugCreator from "debug";
import connectToDatabase from "./database/index.js";

const debug = debugCreator("ecommerce:server:index");

const port = process.env.PORT ?? 4000;
const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  debug(chalk.red("Missing MongoDB Connection String"));
  process.exit();
}

await connectToDatabase(mongoUrl);
startServer(Number(port));
