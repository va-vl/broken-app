import Sequelize from 'sequelize';
import { StatusCodes } from 'http-status-codes';

export default (err, req, res, next) => {
  if (err instanceof Sequelize.DatabaseError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Database Error: ${err.message}`);
  }

  if (!err.code) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(`Error: ${err.message || 'undocumented'}`);
  }

  res.status(err.code).send(err.message);
};
