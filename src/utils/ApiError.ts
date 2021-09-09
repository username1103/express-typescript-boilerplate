import { ErrorData } from './errorData';

export default class ApiError extends Error {
  statusCode: number;

  name: string;

  errorCode: string;

  message: string;

  isOperational: boolean;

  stack?: string | undefined;

  constructor(statusCode: number, errorData: ErrorData, isOperational = true, stack = '') {
    const { name, errorCode, message } = errorData;
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.errorCode = errorCode;
    this.message = message;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
