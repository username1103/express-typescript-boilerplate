import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

export type Node_Env = 'production' | 'test' | 'development';
type configSchema = {
  env: Node_Env;
  port: number;
  swaggerAuth: {
    id: string;
    password: string;
  };
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
  };
};

type envSchema = {
  NODE_ENV: Node_Env;
  PORT: number;

  DB: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  SW_ID: string;
  SW_PASSWORD: string;

  JWT_SECRET: string;
  JWT_ACCESS_EXPIRATION_MINUTES: number;
  JWT_REFRESH_EXPIRATION_DAYS: number;
};

dotenv.config({ path: path.join(__dirname, '../../dev.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),

    DB: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),

    SW_ID: Joi.string().default('id'),
    SW_PASSWORD: Joi.string().default('password'),

    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env) as {
  value: envSchema;
  error: Joi.ValidationError | undefined;
};

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  swaggerAuth: {
    id: envVars.SW_ID,
    password: envVars.SW_PASSWORD,
  },
  db: {
    type: envVars.DB,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
} as configSchema;
