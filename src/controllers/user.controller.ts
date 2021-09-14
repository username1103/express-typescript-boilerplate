import httpStatus from 'http-status';
import { User } from '../entities/User';
import { GetUserRequest } from '../interfaces/validations';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { errorDatas } from '../utils/errorData';

export const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params as GetUserRequest['params'];

  const user = await User.findOne(userId);

  if (user === undefined) {
    throw new ApiError(httpStatus.NOT_FOUND, errorDatas.USER_NOT_FOUND);
  }

  res.send(user);
});

export const getUsers = catchAsync(async (req, res) => {
  res.send('getUsers');
});
