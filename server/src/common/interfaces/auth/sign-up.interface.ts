import { ILogin } from './login.interface';

interface ISignUp extends ILogin {
  username: string;
}

export type { ISignUp };
