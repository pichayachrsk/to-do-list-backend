import { Request, Response, NextFunction } from "express";
import { AddOrUpdateItem, UpdateItemField } from "../schemas/validationSchema";
import { validateOrReject } from "class-validator";
import {
  BadRequestException,
  handleError,
} from "../utils/errorHandler";

export const addOrUpdateItemValidation = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) throw new BadRequestException();

      const item = Object.assign(new AddOrUpdateItem(), req.body);
      await validateOrReject(item);
      next();
    } catch (error: unknown) {
      const response = handleError(error);
      res.status(response.statusCode).json({
        message: response.message,
      });
    }
  };
};

export const updateItemFieldValidation = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body || !Object.keys(req.body).length) throw new BadRequestException();

      const item = Object.assign(new UpdateItemField(), req.body);
      await validateOrReject(item);
      next();
    } catch (error: unknown) {
      const response = handleError(error);
      res.status(response.statusCode).json({
        message: response.message,
      });
    }
  };
};
