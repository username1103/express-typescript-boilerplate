import Joi from 'joi';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { RequestJoiSchema } from '../validations/type';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { errorDatas } from '../utils/errorData';

export default (schema: RequestJoiSchema): RequestHandler =>
  (req, res, next) => {
    const object = pick(req, ['params', 'query', 'body']);
    const { value, error } = schema.prefs({ errors: { label: 'key' } }).validate(object, { allowUnknown: true }) as {
      value: typeof object;
      error?: Joi.ValidationError | undefined;
    };

    if (error) {
      const errorMessage = error.details[0].message;
      return next(new ApiError(httpStatus.BAD_REQUEST, { ...errorDatas.INPUT_VALIDATION_ERROR, message: errorMessage }));
    }

    Object.assign(req, value);
    return next();
  };
