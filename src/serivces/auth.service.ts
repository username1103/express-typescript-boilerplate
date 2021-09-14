import { tokenService } from './index';
import { User } from '../entities/User';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { errorDatas } from '../utils/errorData';

export const register = async (phone: string) => {
  const newUser = await User.create({ phone }).save();

  const tokens = tokenService.generateAuthTokens(newUser);

  return tokens;
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const tokenInfo = await tokenService.verifyToken(refreshToken, 'REFRESH');
    const user = await User.findOne(tokenInfo.user);
    if (user === undefined) {
      throw new Error('User not found');
    }

    await tokenInfo.remove();

    return tokenService.generateAuthTokens(user);
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, errorDatas.UNAUTHORIZED);
  }
};
