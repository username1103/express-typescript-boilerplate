import { RequestHandler } from 'express';

export default (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
