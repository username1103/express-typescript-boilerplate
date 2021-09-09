import Joi from 'joi';
import { validationSchema } from './type';

export const register: validationSchema = {
  body: Joi.object().keys({
    phone: Joi.string().required().example('01050568216').description('phone number'),
    verifCode: Joi.string().required().example('777777').description('verification code'),
  }),
};
