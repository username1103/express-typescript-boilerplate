import config from '../config/config';
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { errorDatas } from '../utils/errorData';
import logger from '../config/logger';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, { ...errorDatas.UNKNOWN_ERROR, message: message }, false, err.stack);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, errorCode, message, name } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorCode = errorDatas.INTERNAL_SERVER_ERROR.errorCode;
    message = errorDatas.INTERNAL_SERVER_ERROR.message;
    name = errorDatas.INTERNAL_SERVER_ERROR.name;
  }

  res.locals.errorMessage = err.message;

  const response = {
    name,
    errorCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
