import express from 'express';
import { swaggerDef } from '../../docs/swaggerDef';
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';
import config from '../../config/config';

const router = express.Router();

router.use(
  basicAuth({
    users: { [config.swaggerAuth.id]: config.swaggerAuth.password },
    challenge: true,
  })
);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDef));

export default router;
