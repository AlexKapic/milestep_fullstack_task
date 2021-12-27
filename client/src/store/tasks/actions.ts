import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './actions-types';
import { taskApi } from '../../services';
import { ITask, ITaskCreate, ITasksRequest } from 'common/interfaces/task';
import { actions } from 'store/auth/slice';

export const createTask = createAsyncThunk(
  ActionType.CREATE_TASK,
  async (payload: ITaskCreate, { dispatch }): Promise<void> => {
    const createResponse = await taskApi.createTask(payload);
    dispatch(actions.setTasks(createResponse));
  },
);

export const getTasks = createAsyncThunk(
  ActionType.GET_TASKS,
  async (payload: ITasksRequest, { dispatch }): Promise<void> => {
    const getResponse = await taskApi.getTasks(payload);
    dispatch(actions.setTasks(getResponse));
  },
);

export const getTask = createAsyncThunk(
  ActionType.GET_TASK,
  async (id: string): Promise<ITask> => await taskApi.getTask(id),
);

export const deleteTask = createAsyncThunk(
  ActionType.DELETE_TASK,
  async (id: string, { dispatch }): Promise<void> => {
    const getResponse = await taskApi.deleteTask(id);
    dispatch(actions.setTasks(getResponse));
  },
);

export const editTask = createAsyncThunk(
  ActionType.EDIT_TASK,
  async (
    payload: { payload: ITaskCreate; id: string },
    { dispatch },
  ): Promise<void> => {
    const getResponse = await taskApi.editTask(payload);
    dispatch(actions.setTasks(getResponse));
  },
);

export const doneTask = createAsyncThunk(
  ActionType.DONE_TASK,
  async (
    payload: { isDone: boolean; id: string },
    { dispatch },
  ): Promise<ITask> => {
    const getOneTaskResponse = await taskApi.doneTask(payload);
    const getResponse = await taskApi.getTasks();
    dispatch(actions.setTasks(getResponse));
    return getOneTaskResponse;
  },
);

export const doneTasks = createAsyncThunk(
  ActionType.DONE_TASKS,
  async (payload: { isDone: boolean }, { dispatch }): Promise<void> => {
    const getResponse = await taskApi.doneTasks(payload);
    dispatch(actions.setTasks(getResponse));
  },
);

const taskActions = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  editTask,
  doneTask,
  doneTasks,
};

export { taskActions };
