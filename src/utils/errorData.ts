export type ErrorData = {
  name: string;
  errorCode: string;
  message: string;
};

export const errorDatas: { [key: string]: ErrorData } = {
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
  INVALID_TOKEN_ERROR: {
    name: 'TokenError',
    errorCode: 'INVALID_TOKEN_ERROR',
    message: 'It is invalid token',
  },
};
