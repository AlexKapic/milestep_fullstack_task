import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { HttpCode, HttpErrorMessage } from '../common/enums';
import { HttpError } from '../common/exceptions';
import {
  decodeToken,
  generateTokens,
  generateVerifyToken,
} from '../common/utils/tokens.util';
import { UNIQUE_EMAIL, UNIQUE_USERNAME, User } from '../data/entities/user';
import { RefreshTokenRepository } from '../data/repositories';
import { env } from '../env';
import { ILogin, ISignUp, ITokens } from '../common/interfaces/auth';
import { IUser, IUserWithTokens } from '../common/interfaces/user';
import { hash, sendMail, verify } from '../common/utils';
import UserRepository from '../data/repositories/user.repository';

export const signUp = async (
  body: ISignUp,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const hashedPassword = await hash(body.password);
  const isSignUp = true;

  try {
    const userData = {
      ...body,
      email: body.email.toLowerCase(),
      password: hashedPassword,
    };

    const user = await userRepository.save(userData);
    return getIUserWithTokens(user, isSignUp);
  } catch (error: any) {
    if (error?.constraint === UNIQUE_USERNAME) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.USERNAME_ALREADY_EXISTS,
      });
    } else if (error?.constraint === UNIQUE_EMAIL) {
      throw new HttpError({
        status: HttpCode.CONFLICT,
        message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
      });
    } else {
      throw new HttpError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: HttpErrorMessage.INTERNAL_SERVER_ERROR,
      });
    }
  }
};

export const signIn = async (
  body: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(body.email.toLowerCase());
  if (!user || user.password === null) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  const isPasswordCorrect = await verify(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  return getIUserWithTokens(user);
};

export const signOut = async (
  body: Pick<IUserWithTokens, 'refreshToken'>,
): Promise<void> => {
  const { refreshToken } = body;
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const userRefreshToken = await refreshTokenRepository.findByToken(
    refreshToken,
  );
  if (userRefreshToken?.token) {
    await refreshTokenRepository.remove(userRefreshToken);
  }
};

const getIUserWithTokens = async (
  user: User,
  isSignUp?: boolean,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const tokens = await setTokens(user);
  isSignUp && verifyEmail(user, generateVerifyToken(user.id));

  const { id, username, email, tasks } = user;
  return {
    id,
    username,
    email,
    tasks,
    ...tokens,
  };
};

const setTokens = async (user: IUser): Promise<ITokens> => {
  const tokens = generateTokens(user.id);
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const refreshToken = refreshTokenRepository.create({
    user,
    token: tokens.refreshToken,
  });
  await refreshTokenRepository.save(refreshToken);

  return tokens;
};

export const refreshTokens = async (
  body: Pick<IUserWithTokens, 'refreshToken'>,
): Promise<ITokens> => {
  try {
    const { refreshToken } = body;
    jwt.verify(refreshToken, env.app.secretKey);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    const userRefreshToken = await refreshTokenRepository.findByToken(
      refreshToken,
    );
    if (!userRefreshToken?.token) {
      throw new Error();
    }
    await refreshTokenRepository.remove(userRefreshToken);

    const tokens = await setTokens(userRefreshToken.user);
    return tokens;
  } catch {
    throw new HttpError({
      status: HttpCode.UNAUTHORIZED,
      message: HttpErrorMessage.UNAUTHORIZED,
    });
  }
};

const verifyEmail = async (user: User, token: string): Promise<void> => {
  const { app } = env;
  const url = `${app.url}/confirm-email?token=${token}`;

  await sendMail({
    to: user.email,
    subject: 'Confirm your email by click on the link ',
    text: url,
  });
};

export const confirmEmail = async (body: { token: string }): Promise<void> => {
  const { token } = body;
  if (!token) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_TOKEN,
    });
  }

  const { userId } = decodeToken(token);
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);

  if (!user.confirmedAt) {
    await userRepository.confirmEmail(userId);
  }
};
