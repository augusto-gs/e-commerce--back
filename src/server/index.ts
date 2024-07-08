import { pingRouter } from "../features/ping/router/pingRouter.js";
import { userRouter } from "../features/users/router/userRouter.js";
import app from "./app.js";
import endpointNotFound from "./middlewares/endpointNotFound.js";
import generalError from "./middlewares/generalError.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { garmentRouter } from "../features/garments/router/garmentRouter.js";

app.use(morgan("dev"));

app.use(express.json());

const corsWhitelist = [process.env.ALLOWED_ORIGIN!];

app.use(
  cors({
    origin: corsWhitelist,
  }),
);

app.use("/", pingRouter);

app.use("/auth", userRouter);

app.use("/garments", garmentRouter);

app.use(endpointNotFound);

app.use(generalError);
