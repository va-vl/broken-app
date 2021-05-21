import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
//
import { asyncHandler } from '../utils/index.js';
import * as config from '../config/index.js';

export default (userModel) =>
  asyncHandler(async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      return res.status(StatusCodes.FORBIDDEN).json({
        auth: false,
        message: 'No token provided.',
      });
    }

    await jwt.verify(
      sessionToken,
      config.JWT_KEY,
      async (_, decoded) => {
        if (!decoded) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            auth: false,
            message: 'Bad request',
          });
        }

        const { id } = decoded;
        const user = await userModel.findOne({ where: { id } });

        if (user === null) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            auth: false,
            message: 'Unauthorized',
          });
        }

        req.user = user;
        next();
      },
    );
  });
