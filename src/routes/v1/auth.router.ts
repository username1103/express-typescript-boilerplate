import express from 'express';
import { authValidation } from '../../validations';
import j2s from 'joi-to-swagger';

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('hi');
});

export default router;

export const swAuthRouter = {
  '/auth/register': {
    post: {
      summary: '회원가입',
      description: '사용자 정보를 저장하고 인증 토큰을 제공합니다.',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { ...j2s(authValidation.register.body).swagger },
          },
        },
      },
      responses: {
        '201': {
          description: 'Created',
          content: {
            'application/json': {
              schema: {},
            },
          },
        },
      },
    },
  },
};
