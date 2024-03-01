import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface UserRequest extends Request {
  user?: any;
}

/**
 * Middleware to check if the user is authenticated
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default () => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const token =
      req.headers['authorization'] &&
      req.headers['authorization'].split('Bearer ')[1];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      function (err: any, decoded: any) {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.user = decoded;
        next();
      },
    );
  };
};
