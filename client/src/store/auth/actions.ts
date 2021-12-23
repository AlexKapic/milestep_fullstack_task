import { createAsyncThunk } from '@reduxjs/toolkit';
import { actions } from './slice';
import { ActionType } from './actions-types';
import { authApi } from '../../services';
import { ISignIn, ISignUp } from 'common/interfaces/auth';
import { setTokensLocalStorage } from './local-storage';
import { IUserWithTokens } from 'common/interfaces/user';
import { LocalStorageVariable } from 'common/enums';

const signIn = createAsyncThunk(
  ActionType.SET_USER,
  async (signInPayload: ISignIn): Promise<IUserWithTokens> => {
    const signInResponse = await authApi.signIn(signInPayload);
    setTokensLocalStorage(signInResponse);
    return signInResponse;
  },
);

const signUp = createAsyncThunk(
  ActionType.SET_USER,
  async (signUpPayload: ISignUp): Promise<IUserWithTokens> => {
    const signUpResponse = await authApi.signUp(signUpPayload);
    setTokensLocalStorage(signUpResponse);
    return signUpResponse;
  },
);

const signOut = createAsyncThunk(
  ActionType.REMOVE_USER,
  async (): Promise<void> => {
    const refreshToken = localStorage.getItem(
      LocalStorageVariable.REFRESH_TOKEN,
    );
    localStorage.removeItem(LocalStorageVariable.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageVariable.REFRESH_TOKEN);

    if (refreshToken) await authApi.signOut({ refreshToken });
  },
);

const authActions = {
  ...actions,
  signIn,
  signUp,
  signOut,
};

export { authActions };
