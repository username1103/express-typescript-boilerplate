import Joi from 'joi';
import { validationSchema } from './type';

const register: validationSchema = {
  body: Joi.object().keys({
    phone: Joi.string().required().example('01050568216'),
    verifCode: Joi.string().required().example('777777'),
  }),
};

export default {
  register,
};
