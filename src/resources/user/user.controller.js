import { StatusCodes } from 'http-status-codes';
import { Router } from 'express';
//
import { asyncHandler } from '../../utils/index.js';

const getUserProps = (req) => ({
  full_name: req.body.user.full_name,
  username: req.body.user.username,
  password: req.body.user.password,
  email: req.body.user.email,
});

const router = Router();

export default (userService) => {
  router.post(
    '/signup',
    asyncHandler(async (req, res) => {
      const userProps = getUserProps(req);
      const { user, token } = await userService.signup(userProps);

      res.status(StatusCodes.OK).json({ user, token });
    }),
  );

  router.post(
    '/signin',
    asyncHandler(async (req, res) => {
      const { username, password } = getUserProps(req);
      const { user, sessionToken } = await userService.signin(
        username,
        password,
      );

      res.status(StatusCodes.OK).json({
        user,
        sessionToken,
        message: 'Successfully authenticated.',
      });
    }),
  );

  return router;
};
