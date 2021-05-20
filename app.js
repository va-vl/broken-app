import express from 'express';
import Sequelize from 'sequelize';
//
import db from './src/db.js';
import userController from './src/controllers/usercontroller.js';
import userModel from './src/models/user.js';
import gameController from './src/controllers/gamecontroller.js';
import gameModel from './src/models/game.js';
import validateSession from './src/middleware/validate-session.js';

const PORT = 4000;

const app = express();
const models = {
  User: userModel(db, Sequelize),
  Game: gameModel(db, Sequelize),
};

const runApp = async () => {
  try {
    await db.authenticate();
    await db.sync();
    process.stdout.write('Connected to DB!');
  } catch (err) {
    process.stderr.write(`Error: ${err}`);
    process.exit(1);
  }

  app.use(express.json());
  app.use('/api/auth', userController(models.User));
  app.use('/api/game', validateSession(models.User), gameController(models.Game));
};

runApp();

app.listen(PORT, () => { process.stdout.write(`App is listening on port ${PORT}\n`); });
