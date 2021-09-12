import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';
import { User } from '../entities/User';
import { Token } from '../entities/Token';

export const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: 'ACCESS' | 'REFRESH',
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

export const saveRefreshToken = async (token: string, user: User, expires: moment.Moment) => {
  await Token.create({
    user,
    token,
    expires: expires.toDate(),
  }).save();
};

export const generateAuthTokens = async (user: User) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, 'ACCESS');

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, 'REFRESH');

  await saveRefreshToken(refreshToken, user, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
    userId: user.id,
  };
};
