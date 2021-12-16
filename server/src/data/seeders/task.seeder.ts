import { tasks } from '../seed-data/task.data';
import { Task } from '../entities/task';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class TaskSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (task) => {
      await Object.assign(new Task(), task).save();
    }, tasks);
  }
}
