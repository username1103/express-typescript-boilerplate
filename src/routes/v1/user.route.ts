import express from 'express';
import { userValidation } from '../../validations';
import validate from '../../middlewares/validate';
import { userController } from '../../controllers';
import { getRequestSwaggerFormFor } from '../../utils/request-to-swagger';

const router = express.Router();

router.get('/:userId', validate(userValidation.getUser), userController.getUser);
router.get('/', validate(userValidation.getUsers), userController.getUsers);
export default router;

export const swUserRouter = {
  '/user/{userId}': {
    get: {
      summary: '사용자 정보 제공',
      description: 'userId 값에 따른 사용자 정보를 제공합니다.',
      tags: ['User'],
      ...getRequestSwaggerFormFor(userValidation.getUser),
      responses: {
        '200': {
          description: 'Ok',
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
