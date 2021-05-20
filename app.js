import express from 'express';
import Sequelize from 'sequelize';
//
import db from './src/db/db.sequelize.js';
import userController from './src/resources/user/user.controller.js';
import userModel from './src/resources/user/user.model.js';
import gameController from './src/resources/game/game.controller.js';
import gameModel from './src/resources/game/game.model.js';
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

    app.use(express.json());
    app.use('/api/auth', userController(models.User));
    app.use('/api/game', validateSession(models.User), gameController(models.Game));
  } catch (err) {
    process.stderr.write(`Error: ${err}`);
    process.exit(1);
  }
};

app.listen(PORT, () => { process.stdout.write(`App is listening on port ${PORT}\n`); });

runApp();
