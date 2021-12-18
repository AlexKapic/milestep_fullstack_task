import { Express } from 'express';
// import userRoute from './user-route';
import authRoute from './auth-route';
// import taskRoute from './task-route';

const routes = (app: Express): void => {
  // app.use('/api/users', userRoute);
  app.use('/api/auth', authRoute);
  // app.use('/api/tasks', taskRoute);
};
export default routes;
