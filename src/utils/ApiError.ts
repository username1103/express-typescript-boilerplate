import httpStatus from 'http-status';
import { ErrorData } from './errorData';

export default class ApiError extends Error {
  statusCode: keyof httpStatus.HttpStatus;
  name: string;
  errorCode: string;
  isOperational: boolean;
  stack?: string | undefined;

  constructor(
    statusCode: keyof httpStatus.HttpStatus,
    errorData: ErrorData,
    isOperational: boolean = true,
    stack: string = ''
  ) {
    const { name, error, message } = errorData;
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.errorCode = error;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
