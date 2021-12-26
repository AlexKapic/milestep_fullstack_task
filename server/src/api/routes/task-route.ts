import { Router } from 'express';
import { createTaskSchema } from '../../common/validations';
import { run } from '../../common/helpers/route.helper';
import { validationMiddleware } from '../middlewares';
import {
  createTask,
  deleteTask,
  doneTask,
  doneTasks,
  editTask,
  getTask,
  getTasks,
} from '../../services/task.service';

const router: Router = Router();

router.post(
  '/',
  run((req) => getTasks(req.userId, req.body)),
);

router.post(
  '/create',
  validationMiddleware(createTaskSchema),
  run((req) => createTask(req.userId, req.body)),
);

router.get(
  '/:id',
  run((req) => getTask(req.userId, req.params.id)),
);

router.delete(
  '/:id',
  run((req) => deleteTask(req.userId, req.params.id)),
);

router.put(
  '/:id',
  validationMiddleware(createTaskSchema),
  run((req) => editTask(req.userId, req.params.id, req.body)),
);

router.patch(
  '/done/:id',
  run((req) => doneTask(req.userId, req.params.id)),
);

router.patch(
  '/done',
  run((req) => doneTasks(req.userId, req.body)),
);

export default router;
