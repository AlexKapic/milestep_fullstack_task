import { Router } from 'express';
import { run } from '../../common/helpers/route.helper';
import { signUpSchema, signInSchema } from '../../common/validations';
import {
  signIn,
  signUp,
  refreshTokens,
  signOut,
} from '../../services/auth.service';
import { validationMiddleware } from '../middlewares';
const router: Router = Router();

router.post(
  '/sign-up',
  validationMiddleware(signUpSchema),
  run((req) => signUp(req.body)),
);

router.post(
  '/sign-in',
  validationMiddleware(signInSchema),
  run((req) => signIn(req.body)),
);

router.post(
  '/refresh',
  run((req) => refreshTokens(req.body)),
);

router.post(
  '/sign-out',
  run((req) => signOut(req.body)),
);

export default router;
