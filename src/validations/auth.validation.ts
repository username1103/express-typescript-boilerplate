import Joi from 'joi';
import { RequestJoiSchema } from './type';

export const register: RequestJoiSchema = Joi.object()
  .keys({
    body: Joi.object()
      .keys({
        phone: Joi.string().required().example('01050568216').description('phone number'),
        verifCode: Joi.string().required().example('777777').description('verification code'),
      })
      .required(),
  })
  .meta({ className: 'RegisterRequest' });

export const logout: RequestJoiSchema = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        userId: Joi.string().required().example('213123').description('ggggdsdsds'),
      })
      .required(),
  })
  .meta({ className: 'LogoutRequest' });

export const refreshTokens: RequestJoiSchema = Joi.object()
  .keys({
    body: Joi.object()
      .keys({
        refreshToken: Joi.string()
          .required()
          .example(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MzM4MmQ1My1lOGJjLTRjODYtOTZlZC03ZWIxMjQ2ZmFjY2EiLCJpYXQiOjE2MzE1NDgwOTgsImV4cCI6MTYzNDE0MDA5OCwidHlwZSI6IlJFRlJFU0gifQ.3F-YrYYUZmrTCMNhuM8s1zx9cNDsJGj8uTtPllhoW1I'
          )
          .description('refresh token'),
      })
      .required(),
  })
  .meta({ className: 'RefreshTokensRequest' });
