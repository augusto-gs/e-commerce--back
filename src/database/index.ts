import mongoose from "mongoose";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("ecommerce:database:index");

const connectToDatabase = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database"));
  } catch {
    debug(chalk.red("Failed to connect to database"));
  }
};

export default connectToDatabase;
