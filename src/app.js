import express from 'express';

import config from './config';
import Logger from './config/logger';
import routes from './routes';

const startServer = () => {
  const app = express();
  app.enable('trust proxy');
  app.use(config.api.prefix, routes());
  app
    .listen(config.port, () => {
      Logger.info(`
    ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
    ################################################
    `);
    })
    .on('error', (err) => {
      Logger.error(err);
      process.exit(1);
    });
};

startServer();
