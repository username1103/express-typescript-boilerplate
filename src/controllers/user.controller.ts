import catchAsync from '../utils/catchAsync';

export const getUser = catchAsync(async (req, res) => {
  res.send('getUser');
});
