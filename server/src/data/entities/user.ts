import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { Task } from './task';

export const UNIQUE_USERNAME = 'unique_user_username_constraint';
export const UNIQUE_EMAIL = 'unique_user_email_constraint';

@Entity()
@Unique(UNIQUE_USERNAME, ['username'])
@Unique(UNIQUE_EMAIL, ['email'])
export class User extends AbstractEntity {
  @Column({ length: 200 })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ nullable: true })
  confirmedAt: Date;

  @OneToMany(() => Task, (Task) => Task.author)
  tasks: Task[];
}
