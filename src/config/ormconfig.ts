import { ConnectionOptions } from 'typeorm';
import config, { Node_Env } from './config';

export default {
  production: {},
  test: {
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  },
  development: {},
} as { [key in Node_Env]: ConnectionOptions };
