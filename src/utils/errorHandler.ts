import { ValidationError } from "class-validator";
import createHttpError from "http-errors";
import CreateHttpError, { HttpError } from "http-errors";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class BadRequestException {
  constructor(message = ReasonPhrases.BAD_REQUEST) {
    throw CreateHttpError(StatusCodes.BAD_REQUEST, message);
  }
}

export function handleError(error: unknown): HttpError {
  if (error instanceof HttpError) return error;

  if (
    Array.isArray(error) &&
    error.length &&
    error[0] instanceof ValidationError
  )
    return createHttpError(StatusCodes.BAD_REQUEST, "Validation body failed");

  return createHttpError(
    StatusCodes.INTERNAL_SERVER_ERROR,
    ReasonPhrases.INTERNAL_SERVER_ERROR
  );
}
