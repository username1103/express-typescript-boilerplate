export type ErrorData = {
  name: string;
  errorCode: errorType;
  message: string;
};

type errorType =
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'INPUT_VALIDATION_ERROR'
  | 'USER_ALREADY_EXIST'
  | 'UNKNOWN_ERROR'
  | 'USER_NOT_FOUND';

export const errorDatas: { [key in errorType]: ErrorData } = {
  UNKNOWN_ERROR: {
    name: 'Error',
    errorCode: 'UNKNOWN_ERROR',
    message: 'Unknown',
  },
  INTERNAL_SERVER_ERROR: {
    name: 'Error',
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'INTERNAL_SERVER_ERROR',
  },
  NOT_FOUND: {
    name: 'NotFoundError',
    errorCode: 'NOT_FOUND',
    message: 'NOT_FOUND',
  },
  UNAUTHORIZED: {
    name: 'Error',
    errorCode: 'UNAUTHORIZED',
    message: 'Please authenticate',
  },
  INPUT_VALIDATION_ERROR: {
    name: 'ValidationError',
    errorCode: 'INPUT_VALIDATION_ERROR',
    message: 'Not validated Input',
  },
  USER_ALREADY_EXIST: {
    name: 'BadRequestError',
    errorCode: 'USER_ALREADY_EXIST',
    message: 'User already exist',
  },
  USER_NOT_FOUND: {
    name: 'NotFoundError',
    errorCode: 'USER_NOT_FOUND',
    message: 'User not found',
  },
};
