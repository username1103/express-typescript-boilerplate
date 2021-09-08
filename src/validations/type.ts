import Joi from 'joi';

export type validationSchema = {
  [key in 'query' | 'params' | 'body']?: Joi.ObjectSchema;
};
