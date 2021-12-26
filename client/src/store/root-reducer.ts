import { authReducer as auth } from './auth';
import { taskReducer as task } from './tasks';

const rootReducer = {
  auth,
  task,
};

export { rootReducer };
