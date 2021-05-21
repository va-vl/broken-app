import Sequelize from 'sequelize';
//
import * as config from '../config/index.js'

export default new Sequelize(
  config.DB,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    operatorsAliases: Sequelize.Op,
    dialect: 'postgres',
    logging: false,
  },
);
