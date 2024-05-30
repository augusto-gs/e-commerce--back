import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../CustomError/CustomError";
import debugCreator from "debug";
import chalk from "chalk";

const debug = debugCreator("ecommerce:server:middlewares:generalError");

const generalError = (
  _req: Request,
  res: Response,
  _next: NextFunction,
  error: CustomError,
) => {
  const statusCode = error.statusCode ?? 500;
  const privateMessage = error.customMessage ?? error.message;
  debug(chalk.red("Error" + privateMessage));

  res.status(statusCode).json(privateMessage);
};

export default generalError;
