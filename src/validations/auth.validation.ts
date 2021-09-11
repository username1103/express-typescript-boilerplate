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
