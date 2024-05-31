import app from "./app.js";
import endpointNotFound from "./middlewares/endpointNotFound.js";
import generalError from "./middlewares/generalError.js";
import express from "express";
import morgan from "morgan";

app.use(morgan("dev"));

app.use(express.json());

app.use(endpointNotFound);

app.use(generalError);
