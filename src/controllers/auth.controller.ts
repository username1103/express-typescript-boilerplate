import httpStatus from 'http-status';
import { User } from '../entities/User';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { errorDatas } from '../utils/errorData';
import { RegisterRequest } from '../interfaces/validations/index';
import { authService } from '../serivces';

export const register = catchAsync(async (req, res) => {
  const { phone } = req.body as RegisterRequest['body'];

  if (await User.findOne({ phone })) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorDatas.USER_ALREADY_EXIST);
  }

  const tokens = await authService.register(phone);

  return res.status(httpStatus.CREATED).send(tokens);
});

export const logout = catchAsync(async (req, res) => {
  return res.send('logout');
});
