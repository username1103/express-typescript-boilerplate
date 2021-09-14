import { Request, RequestHandler } from 'express';
import httpStatus from 'http-status';
import { VerifyErrors } from 'jsonwebtoken';
import passport from 'passport';
import { VerifiedCallback } from 'passport-jwt';
import { User } from '../entities/User';
import ApiError from '../utils/ApiError';
import { errorDatas } from '../utils/errorData';

const verifyCallback =
  (req: Request, resolve: any, reject: any): VerifiedCallback =>
  async (err: Error, user: User | undefined, info: VerifyErrors) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, errorDatas.UNAUTHORIZED));
    }
    req.user = user;

    resolve();
  };

export const auth: RequestHandler = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};
