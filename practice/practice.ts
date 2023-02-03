import Joi from "joi";
import { AppError, HttpCode } from "../utils/AppError";
import { NextFunction } from "express";

export const Validator = async (
  shemaName: Joi.ObjectSchema,
  body: object,
  next: NextFunction
): Promise<void> => {
  const value = await shemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  try {
    value.error
      ? next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            message: value.error.details[0].message,
          })
        )
      : next();
  } catch (error) {
    console.log(error);
  }
};
