import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { ISortTask } from '../../common/interfaces/task';
import { Task } from '../entities/task';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
  public findByUser(authorId: string): Promise<Task[]> {
    return this.find({ authorId });
  }

  public findByUserAndId(authorId: string, id: string): Promise<Task> {
    return this.findOne({ authorId, id });
  }

  public findByUserAndSort(
    authorId: string,
    sortBy?: ISortTask,
  ): Promise<Task[]> {
    return this.find({
      where: { authorId },
      order: sortBy ? sortBy : { isDone: 'ASC' },
      select: ['id', 'title', 'isDone'],
    });
  }

  public deleteByUserAndId(
    authorId: string,
    id: string,
  ): Promise<DeleteResult> {
    return this.delete({ authorId, id });
  }

  public findByUserAndIsDone(
    authorId: string,
    isDone: boolean,
  ): Promise<Task[]> {
    return this.find({ authorId, isDone });
  }
}

export default TaskRepository;
