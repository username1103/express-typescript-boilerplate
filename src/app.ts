import express from 'express';
import helmet from 'helmet';
import routes from './routes/v1/index';
import * as morgan from './config/morgan';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import { errorDatas } from './utils/errorData';
import httpStatus from 'http-status';

const app = express();

// logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// set Security HTTP headers
app.use(helmet());

app.use('/v1', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, errorDatas.NOT_FOUND));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;
