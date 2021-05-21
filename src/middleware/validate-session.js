import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
//
import { createErrorResponse } from '../utils/create-response.js';

export default (userModel) => (req, res, next) => {
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

  jwt.verify(
    sessionToken,
    'lets_play_sum_games_man',
    (_, decoded) => {
      if (!decoded) {
        return createErrorResponse(res, StatusCodes.BAD_REQUEST, 'Not authorized')
      }

      const { id } = decoded;

      userModel
        .findOne({ where: { id } })
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(() => createErrorResponse(
          res, StatusCodes.UNAUTHORIZED, 'Not authorized',
        ));
    }
  );
};
