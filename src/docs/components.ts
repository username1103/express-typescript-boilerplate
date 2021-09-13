import { errorDatas } from '../utils/errorData';

export default {
  Error: {
    INPUT_VALIDATION_ERROR: {
      description: '유효하지 않은 요청입니다.',
      value: {
        ...errorDatas.INPUT_VALIDATION_ERROR,
      },
    },
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};
