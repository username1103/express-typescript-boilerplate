import express from 'express';
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';
import swaggerJSDoc from 'swagger-jsdoc';
import config from '../../config/config';
import swaggerDefinition from '../../docs/swaggerDef';

const router = express.Router();

const specs = swaggerJSDoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.ts'],
});

router.use(
  basicAuth({
    users: { [config.swaggerAuth.id]: config.swaggerAuth.password },
    challenge: true,
  })
);

router.use('/', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

export default router;
