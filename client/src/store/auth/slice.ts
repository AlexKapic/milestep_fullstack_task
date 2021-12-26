import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../common/enums';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './actions-types';
import { signIn, signUp, loadUser } from './actions';
import { RequestStatus } from 'common/enums/app/request-status.enum';

type State = {
  user: IUser | null;
  requestStatus: RequestStatus;
};

const initialState: State = {
  user: null,
  requestStatus: RequestStatus.IDLE,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.REMOVE_USER]: (state) => {
      state.user = null;
      state.requestStatus = RequestStatus.IDLE;
    },
    [ActionType.SET_TASKS]: (state, action) => {
      if (state.user) state.user.tasks = action.payload;
      state.requestStatus = RequestStatus.IDLE;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(signIn.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(signUp.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(signUp.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(loadUser.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(loadUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  },
});

export { reducer, actions };
