import Joi from 'joi';
import { RequestHandler } from 'express';
import { validationSchema } from '../validations/type';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { errorDatas } from '../utils/errorData';

export default (schema: validationSchema): RequestHandler =>
  (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details[0].message;
      next(new ApiError(httpStatus.BAD_REQUEST, { ...errorDatas.INPUT_VALIDATION_ERROR, message: errorMessage }));
    }

    Object.assign(req, value);
    return next();
  };
