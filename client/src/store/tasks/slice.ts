import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../common/enums';
import { ActionType } from './actions-types';
import {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  editTask,
  doneTask,
  doneTasks,
} from './actions';
import { RequestStatus } from 'common/enums/app/request-status.enum';
import { ITask } from 'common/interfaces/task';

type State = {
  currentTask: ITask | null;
  requestStatus: RequestStatus;
};

const initialState: State = {
  currentTask: null,
  requestStatus: RequestStatus.IDLE,
};

const { reducer, actions } = createSlice({
  name: ReducerName.TASK,
  initialState,
  reducers: {
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(createTask.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(getTasks.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(getTasks.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(getTasks.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(getTask.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(getTask.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(deleteTask.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(editTask.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(editTask.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(doneTask.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(doneTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(doneTask.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(doneTasks.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(doneTasks.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(doneTasks.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  },
});

export { reducer, actions };
