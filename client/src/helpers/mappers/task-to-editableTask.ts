import { ITask } from 'common/interfaces/task';
import moment from 'moment';

export const mapTaskToEditableTask = (
  task: ITask,
): Omit<ITask, 'id' | 'authorId'> => {
  return {
    title: task.title,
    description: task.description,
    priority: String(task.priority) as unknown as number,
    dueDate: moment(task.dueDate).format('YYYY-MM-DD') as unknown as Date,
  };
};
