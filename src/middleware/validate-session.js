import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
//
import * as config from '../config/index.js';
import { createErrorResponse } from '../utils/index.js';

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

  try {
    const { id } = jwt.verify(sessionToken, config.JWT_KEY);

    userModel.findOne({ where: { id } })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => createErrorResponse(
        res, StatusCodes.UNAUTHORIZED, 'Not authorized',
      ));
  } catch (err) {
    next(err);
  }
};
