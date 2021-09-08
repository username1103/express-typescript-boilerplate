import app from './app';
import config from './config/config';

const server = app.listen(config.port, () => {
  console.log(`server start: ${config.port}`);
});
