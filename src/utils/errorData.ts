export const errorDatas: { [key: string]: ErrorData } = {
  INTERNAL_SERVER_ERROR: {
    name: 'Error',
    error: 'INTERNAL_SERVER_ERROR',
    message: 'INTERNAL_SERVER_ERROR',
  },
  NOT_FOUND: {
    name: 'NotFoundError',
    error: 'NOT_FOUND',
    message: 'NOT_FOUND',
  },
  INPUT_VALIDATION_ERROR: {
    name: 'ValidationError',
    error: 'INPUT_VALIDATION_ERROR',
    message: 'Not validated Input',
  },
};

export type ErrorData = {
  name: string;
  error: string;
  message: string;
};
