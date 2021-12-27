import { ISignIn } from './sign-in.interface';

interface ISignUp extends ISignIn {
  username: string;
}

export type { ISignUp };
