import Joi from 'joi';

type RequestType = 'params' | 'query' | 'body';

export interface RequestJoiSchema extends Joi.ObjectSchema<Partial<Record<RequestType, Joi.ObjectSchema>>> {}

export interface RequestTypeSchema extends Partial<Record<RequestType, { [key: string]: any }>> {}
