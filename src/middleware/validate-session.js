const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
//
const User = require('../db').import('../models/user');
const { createErrorResponse } = require('../utils/create-response');

module.exports = function (req, res, next) {
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

          User.findOne({ where: { id } })
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
