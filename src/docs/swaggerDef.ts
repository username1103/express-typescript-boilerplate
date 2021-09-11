import { version } from '../../package.json';
import config from '../config/config';
import { swAuthRouter } from '../routes/v1/auth.route';
import definitions from './definitions';
import components from './components';
import { swUserRouter } from '../routes/v1/user.route';

export default {
  openapi: '3.0.0',
  info: {
    title: 'my app API Documentation',
    version,
  },
  servers: [{ url: `http://localhost:${config.port}/v1` }],
  paths: { ...swAuthRouter, ...swUserRouter },
  definitions,
  components,
};
