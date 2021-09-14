import jwt from 'jsonwebtoken';
import config from '../config/config';
import moment from 'moment';
import { User } from '../entities/User';
import { Token } from '../entities/Token';
import { JwtPayload, TokenType } from '../types/Jwt';

const generateToken = (userId: string, expires: moment.Moment, type: TokenType, secret = config.jwt.secret) => {
  const payload: JwtPayload = {
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

export const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
  if (payload.type !== type) {
    throw new Error('It is not validated');
  }
  const tokenInfo = await Token.findOne({ token, user: { id: payload.sub } });
  if (tokenInfo === undefined) {
    throw new Error('Token Not Found');
  }

  return tokenInfo;
};
