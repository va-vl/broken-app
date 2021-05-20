import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

export default new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    operatorsAliases: Sequelize.Op,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
);
