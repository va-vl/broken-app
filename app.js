import express from 'express';
import Sequelize from 'sequelize';
//
import db from './src/db/db.sequelize.js';
import {
  userModel,
  userRepository,
  userService,
  userController,
} from './src/resources/user/index.js'
import {
  gameModel,
  gameRepository,
  gameService,
  gameController,
} from './src/resources/game/index.js';
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

    app.use(
      '/api/auth',
      userController(userService(userRepository(models.User)))
    );
    app.use(
      '/api/game',
      validateSession(models.User),
      gameController(gameService(gameRepository(models.Game)))
    );

    app.use((err, req, res, next) => {
      res.status(500).send(err.message)
    })
  } catch (err) {
    process.stderr.write(`Error: ${err.message}`);
    process.exit(1);
  }
};

app.listen(PORT, () => { process.stdout.write(`App is listening on port ${PORT}\n`); });

runApp();
