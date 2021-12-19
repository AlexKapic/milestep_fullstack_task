/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  VERIFY_EMAIL_TOKEN_EXPIRES_IN,
} from '../../config/jwt-config';
import { ITokens } from '../interfaces/auth';

const { secretKey } = env.app;

const generateAccessToken = (userId: string): string =>
  jwt.sign({ userId }, secretKey, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

const generateRefreshToken = (): string =>
  jwt.sign({}, secretKey, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

const generateVerifyToken = (userId: string): string =>
  jwt.sign({ userId }, secretKey, { expiresIn: VERIFY_EMAIL_TOKEN_EXPIRES_IN });

const generateTokens = (userId: string): ITokens => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(),
  };
};

const decodeToken = (token: string): any =>
  jwt.verify(token, env.app.secretKey);

export {
  generateAccessToken,
  generateRefreshToken,
  generateVerifyToken,
  generateTokens,
  decodeToken,
};
