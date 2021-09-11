import j2s from 'joi-to-swagger';
import { Parameter, RequestBody } from 'swagger-jsdoc';
import { RequestJoiSchema } from '../validations/type';
import pick from './pick';

type PropertySchema = {
  [key: string]: any;
  type: string;
  description?: string;
};

type PropertiesSchema = {
  [key: string]: PropertySchema;
};

type SwaggerSchema = {
  [key: string]: any;
  type: 'object';
  properties: PropertiesSchema;
  required?: Array<string>;
};

export const getRequestSwaggerFormFor = (
  schema: RequestJoiSchema
): { requestBody: RequestBody | undefined; parameters: Array<Parameter> } => {
  const validSchema = pick(schema, ['query', 'body', 'params']);
  const requestBody: RequestBody | undefined =
    validSchema.body !== undefined
      ? {
          required: true,
          content: {
            'application/json': {
              schema: { ...j2s(validSchema.body).swagger },
            },
          },
        }
      : undefined;

  const parameters: Array<Parameter> = [];
  if (validSchema.query !== undefined) {
    const querySchema = j2s(validSchema.query).swagger as SwaggerSchema;
    Object.entries(querySchema.properties).map(([key, value]) =>
      parameters.push({
        name: key,
        in: 'query',
        ...(querySchema.required && querySchema.required.includes(key) && { required: true }),
        ...value,
        schema: {
          type: value.type,
        },
      })
    );
  }

  if (validSchema.params !== undefined) {
    const paramsSchema = j2s(validSchema.params).swagger as SwaggerSchema;
    Object.entries(paramsSchema.properties).map(([key, value]) =>
      parameters.push({
        name: key,
        in: 'path',
        ...(paramsSchema.required && paramsSchema.required.includes(key) && { required: true }),
        ...value,
        schema: {
          type: value.type,
        },
      })
    );
  }

  return { requestBody, parameters };
};
