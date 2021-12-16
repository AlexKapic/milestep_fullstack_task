import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { env } from './env';
import ormconfig from './config/orm-config';
import { logger } from './common/utils/logger.util';
import { auth as authorizationMiddleware } from './api/middlewares';
import routes from './api/routes';

const { port } = env.app;

const app: Express = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authorizationMiddleware);

routes(app);

app.use('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

httpServer.listen(port, async () => {
  try {
    await createConnection(ormconfig);
  } catch (error) {
    logger.info(`App started with error: ${error}`);
  }
  logger.info(`Server is running at ${port}.`);
});

export default app;
