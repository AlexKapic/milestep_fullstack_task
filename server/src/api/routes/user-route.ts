import { Router } from 'express';
import { getUser } from '../../services/user.service';
import { run } from '../../common/helpers/route.helper';

const router: Router = Router();

router.get(
  '/me',
  run((req) => getUser(req.userId)),
);

export default router;
