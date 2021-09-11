import Joi from 'joi';
import { RequestJoiSchema } from './type';

export const getUser: RequestJoiSchema = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        userId: Joi.string().required(),
      })
      .required(),
  })
  .meta({ className: 'GetUserRequest' });

export const getUsers: RequestJoiSchema = Joi.object()
  .keys({
    query: Joi.object()
      .keys({
        limit: Joi.number().min(0).required(),
        from: Joi.number().default(0),
      })
      .required(),
  })
  .meta({ className: 'GetUsersRequest' });
