import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../dev.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    ID: Joi.string().default('id'),
    PASSWORD: Joi.string().default('password'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env) as validationResult;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  swaggerAuth: {
    id: envVars.ID,
    password: envVars.PASSWORD,
  },
} as configSchema;

type configSchema = {
  env: string;
  port: number;
  swaggerAuth: {
    id: string;
    password: string;
  };
};

type validationResult = Joi.ValidationResult & {
  value: {
    NODE_ENV: string;
    PORT: number;
    ID: string;
    PASSWORD: string;
  };
};
