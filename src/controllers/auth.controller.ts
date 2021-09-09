import catchAsync from '../utils/catchAsync';

export const register = catchAsync(async (req, res) => {
  res.send('register');
});

export const logout = catchAsync(async (req, res) => {
  res.send('logout');
});
