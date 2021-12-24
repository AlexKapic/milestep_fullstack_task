import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpErrorMessage } from '../common/enums';
import { HttpError } from '../common/exceptions';
import { IUser } from '../common/interfaces/user';
import { UserRepository } from '../data/repositories';

export const getUser = async (userId: string): Promise<IUser> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_TOKEN,
    });
  }

  return user;
};
