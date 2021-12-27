import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '../common/helpers/array.helper';
import { HttpCode, HttpErrorMessage } from '../common/enums';
import { HttpError } from '../common/exceptions';
import { ITask } from '../common/interfaces/task';
import { ITasksRequest } from '../common/interfaces/task/tasks-request.interface';
import TaskRepository from '../data/repositories/task.repository';

export const createTask = async (
  userId: string,
  body: Omit<ITask, 'id' | 'authorId'>,
): Promise<ITask[]> => {
  const taskRepository = getCustomRepository(TaskRepository);
  const taskData = {
    ...body,
    authorId: userId,
    isDone: false,
  };

  try {
    await taskRepository.save(taskData);
    return getTasks(userId);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getTask = async (
  userId: string,
  taskId: string,
): Promise<ITask> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    return taskRepository.findByUserAndId(userId, taskId);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getTasks = async (
  userId: string,
  body?: ITasksRequest,
): Promise<ITask[]> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    return taskRepository.findByUserAndSort(userId, body?.sortBy);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteTask = async (
  userId: string,
  taskId: string,
): Promise<ITask[]> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    await taskRepository.deleteByUserAndId(userId, taskId);
    return taskRepository.findByUserAndSort(userId);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const editTask = async (
  userId: string,
  taskId: string,
  body: Omit<ITask, 'id' | 'authorId'>,
): Promise<ITask[]> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    const taskToEdit = await taskRepository.findByUserAndId(userId, taskId);
    const editedTask = { ...taskToEdit, ...body };
    await taskRepository.save(editedTask);
    return taskRepository.findByUserAndSort(userId);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const doneTask = async (
  userId: string,
  taskId: string,
  body: { isDone: boolean },
): Promise<ITask> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    const taskToEdit = await taskRepository.findByUserAndId(userId, taskId);
    taskToEdit.isDone = body.isDone;
    await taskRepository.save(taskToEdit);
    return taskToEdit;
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};

export const doneTasks = async (
  userId: string,
  body: { isDone: boolean },
): Promise<ITask[]> => {
  const taskRepository = getCustomRepository(TaskRepository);

  try {
    const tasksToEdit = await taskRepository.findByUserAndIsDone(
      userId,
      !body.isDone,
    );
    await asyncForEach(async (task) => {
      task.isDone = body.isDone;
      await taskRepository.save(task);
    }, tasksToEdit);

    return taskRepository.findByUser(userId);
  } catch {
    throw new HttpError({
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
    });
  }
};
