import 'reflect-metadata';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import express, { Express } from 'express';
// import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { logger } from './common/utils/logger.util';

const PORT = process.env.PORT || 3001;

const app: Express = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(cookieParser());

app.use('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

httpServer.listen(PORT, async () => {
  logger.info(`Server is running at ${PORT}.`);
});

export default app;
