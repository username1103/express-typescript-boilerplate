import catchAsync from '../utils/catchAsync';

export const register = catchAsync(async (req, res) => {
  res.send('hi');
});
