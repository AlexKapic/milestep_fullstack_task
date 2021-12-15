import { Entity, Column, RelationId, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/abstract.entity';
import { User } from './user';

@Entity()
export class Task extends AbstractEntity {
  @RelationId((task: Task) => task.author)
  @Column()
  readonly authorId: string;

  @ManyToOne(() => User, (user) => user.tasks)
  author: User;

  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @Column()
  priority: number;

  @Column()
  dueDate: Date;
}
