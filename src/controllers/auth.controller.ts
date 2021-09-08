import catchAsync from '../utils/catchAsync';

const register = catchAsync(async (req, res) => {
  res.send('hi');
});

export default {
  register,
};
