import httpStatus from 'http-status';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { errorDatas } from '../utils/errorData';

export const register = catchAsync(async (req, res) => {
  const { phone } = req.body;

  if (await getRepository(User).findOne({ where: { phone: phone } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorDatas.USER_ALREADY_EXIST);
  }

  const newUser = new User();
  newUser.phone = phone;

  await getRepository(User).insert(newUser);

  return res.send('hi');
});

export const logout = catchAsync(async (req, res) => {
  return res.send('logout');
});
