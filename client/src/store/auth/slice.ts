import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../common/enums';
import { IUser } from 'common/interfaces/user';
import { ActionType } from './actions-types';
import { authActions } from './actions';
import { RequestStatus } from 'common/enums/app/request-status.enum';

type State = {
  user: IUser | null;
  requestStatus: RequestStatus;
  isRefreshTokenExpired: boolean;
};

const initialState: State = {
  user: null,
  requestStatus: RequestStatus.IDLE,
  isRefreshTokenExpired: false,
};

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {
    [ActionType.REMOVE_USER]: (state) => {
      state.user = null;
      state.requestStatus = RequestStatus.IDLE;
    },
    [ActionType.RESET]: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authActions.signIn.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(authActions.signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(authActions.signIn.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })
      .addCase(authActions.signUp.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(authActions.signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.SUCCEEDED;
      })
      .addCase(authActions.signIn.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  },
});

export { reducer, actions };
