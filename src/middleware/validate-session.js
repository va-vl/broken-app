import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
//
import { createErrorResponse } from '../utils/create-response.js';

export default (UserModel) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
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
        if (decoded) {
          const { id } = decoded;

          UserModel.findOne({ where: { id } })
            .then(
              (user) => {
                req.user = user;
                next();
              },
              () => createErrorResponse(
                res, StatusCodes.UNAUTHORIZED, 'Not authorized',
              ),
            );

          return;
        }

        createErrorResponse(res, StatusCodes.BAD_REQUEST, 'Not authorized');
      });
  }
};
