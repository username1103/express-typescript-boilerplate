import { User } from '../entities/User';
import { GetUserRequest } from '../interfaces/validations';
import catchAsync from '../utils/catchAsync';

export const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params as GetUserRequest['params'];

  const user = await User.findOne(userId);

  res.send(user);
});

export const getUsers = catchAsync(async (req, res) => {
  res.send('getUsers');
});
