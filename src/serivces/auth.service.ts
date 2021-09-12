import { tokenService } from '.';
import { User } from '../entities/User';

export const register = async (phone: string) => {
  const newUser = await User.create({ phone }).save();

  const tokens = tokenService.generateAuthTokens(newUser);

  return tokens;
};
