const Sequelize = require('sequelize');

const sequelize = new Sequelize(
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

sequelize.authenticate().then(
  () => { console.log('Connected to DB'); },
  (err) => { console.err(`Error: ${err}`); },
);

module.exports = sequelize;
