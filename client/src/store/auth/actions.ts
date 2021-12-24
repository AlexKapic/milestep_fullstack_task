import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './actions-types';
import { authApi, userApi } from '../../services';
import { ISignIn, ISignUp } from 'common/interfaces/auth';
import { setTokensLocalStorage } from './local-storage';
import { IUser } from 'common/interfaces/user';
import { LocalStorageVariable } from 'common/enums';

export const signIn = createAsyncThunk(
  ActionType.GET_USER,
  async (signInPayload: ISignIn): Promise<IUser> => {
    const signInResponse = await authApi.signIn(signInPayload);
    setTokensLocalStorage(signInResponse);
    const { accessToken, refreshToken, ...rest } = signInResponse;
    return rest;
  },
);

export const signUp = createAsyncThunk(
  ActionType.SET_USER,
  async (signUpPayload: ISignUp): Promise<IUser> => {
    const signUpResponse = await authApi.signUp(signUpPayload);
    setTokensLocalStorage(signUpResponse);
    const { accessToken, refreshToken, ...rest } = signUpResponse;
    return rest;
  },
);

export const signOut = createAsyncThunk(
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

export const loadUser = createAsyncThunk(
  ActionType.LOAD_USER,
  async (): Promise<IUser> => await userApi.getUser(),
);

const authActions = {
  signIn,
  signUp,
  signOut,
  loadUser,
};

export { authActions };
