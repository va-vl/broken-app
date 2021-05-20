import { StatusCodes } from 'http-status-codes';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//
import {
  createErrorResponse,
  createErrorResponseHandler,
} from '../utils/create-response.js';

const JWT_EXPIRATION_TIME = 60 * 60 * 24;

const router = Router();

export default (UserModel) => {
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

    UserModel.create({
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
        createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
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

    UserModel.findOne({
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

            createErrorResponse(res, StatusCodes.BAD_GATEWAY, 'Passwords do not match');
          });

          return;
        }

        createErrorResponse(res, StatusCodes.FORBIDDEN, 'User not found');
      },
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
    );
  });

  return router;
};
