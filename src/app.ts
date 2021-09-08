import express from 'express';
import helmet from 'helmet';
import routes from './routes/v1/index';
import * as morgan from './config/morgan';

const app = express();

// logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set Security HTTP headers
app.use(helmet());

app.use('/v1', routes);

export default app;
