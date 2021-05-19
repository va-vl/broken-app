const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//
const User = require('../db').import('../models/user');
const createErrorHandler = require('./../utils/createResponseErrorHandler');

const JWT_EXPIRATION_TIME = 60 * 60 * 24;

router.post('/signup', (req, res) => {
  const {
    body: {
      user: {
        full_name: fullName,
        username,
        password,
        email,
      },
    },
  } = req;

  User.create({
    full_name: fullName,
    username,
    email: email,
    passwordHash: bcrypt.hashSync(password, 10),
  })
    .then(
      (user) => {
        const { id } = user;
        const token = jwt.sign(
          { id },
          'lets_play_sum_games_man',
          { expiresIn: JWT_EXPIRATION_TIME },
        );

        res.status(StatusCodes.OK).json({ user, token });
      },
      createErrorHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
    );
});

router.post('/signin', (req, res) => {
  const {
    body: {
      user: {
        username,
        password,
      },
    },
  } = req;

  User.findOne({
    where: { username },
  }).then(
    (user) => {
      if (user) {
        const { passwordHash, id } = user;

        bcrypt.compare(password, passwordHash, (_, matches) => {
          if (matches) {
            const token = jwt.sign(
              { id },
              'lets_play_sum_games_man',
              { expiresIn: JWT_EXPIRATION_TIME },
            );

            return res.status(StatusCodes.OK).json({
              user,
              sessionToken: token,
              message: 'Successfully authenticated.',
            });
          }

          res.status(StatusCodes.BAD_GATEWAY).send('Error: Passwords do not match.');
        });

        return;
      }

      res.status(StatusCodes.FORBIDDEN).send('User not found.');
    },
    createErrorHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
  );
});

module.exports = router;
