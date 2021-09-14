import express from 'express';
import { authValidation } from '../../validations';
import validate from '../../middlewares/validate';
import { authController } from '../../controllers';
import { getRequestSwaggerFormFor } from '../../utils/request-to-swagger';
import definitions from '../../docs/definitions';
import components from '../../docs/components';

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/logout/:userId', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

export default router;

export const swAuthRouter = {
  '/auth/register': {
    post: {
      summary: '회원가입',
      description: '사용자 정보를 저장하고 인증 토큰을 제공합니다.',
      tags: ['Auth'],
      ...getRequestSwaggerFormFor(authValidation.register),
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
        '400': {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: definitions.Error,
              examples: {
                INPUT_VALIDATION_ERROR: components.Error.INPUT_VALIDATION_ERROR,
              },
            },
          },
        },
      },
    },
  },
  '/auth/logout/{user}': {
    post: {
      summary: '로그아웃',
      description: '사용자 인증 토큰, 디바이스 토큰을 데이터베이스에서 제거합니다.',
      tags: ['Auth'],
      ...getRequestSwaggerFormFor(authValidation.logout),
      responses: {
        '200': {
          description: 'Ok',
        },
      },
    },
  },
  '/auth/refresh-tokens': {
    post: {
      summary: '토큰 갱신',
      description: '사용자의 토큰을 갱신합니다.',
      tags: ['Auth'],
      ...getRequestSwaggerFormFor(authValidation.refreshTokens),
      responses: {
        '200': {
          description: 'Ok',
        },
      },
    },
  },
};
