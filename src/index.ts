import startServer from "./server/app.js";
import "dotenv/config";

const port = process.env.PORT ?? 4000;

startServer(Number(port));
