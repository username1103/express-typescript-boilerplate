import Joi from 'joi';
import { validationSchema } from './type';

export const register: validationSchema = {
  body: Joi.object({
    phone: Joi.string().required().example('01050568216').description('phone number'),
    verifCode: Joi.string().required().example('777777').description('verification code'),
  }),
};

export const logout: validationSchema = {
  params: Joi.object({
    user: Joi.string().required().example('213123').description('ggggdsdsds'),
  }),
};
