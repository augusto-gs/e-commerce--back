import { Joi, validate } from "express-validation";
import { type UserStructure } from "../types";

const passData = {
  password: Joi.string().min(8),
  username: Joi.string().required(),
};

const { password, username } = passData;

const registerSchema = {
  body: Joi.object<UserStructure>({
    name: Joi.string().required(),
    password,
    username,
  }),
};
export const registerValidation = validate(
  registerSchema,
  {},
  { abortEarly: false },
);
