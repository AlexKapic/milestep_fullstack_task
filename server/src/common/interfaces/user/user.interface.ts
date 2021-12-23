import { ITask } from '../task';

interface IUser {
  id: string;
  username: string;
  email: string;
  confirmedAt?: Date;
  tasks: ITask[];
}

export type { IUser };
