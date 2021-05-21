import express from 'express';
import Sequelize from 'sequelize';
//
import { db } from './src/db/index.js';
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
import { validateSession } from './src/middleware/index.js';
import { appErrorHandler } from './src/utils/index.js';
import * as config from './src/config/index.js';

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
    app.use(appErrorHandler);
  } catch (err) {
    process.stderr.write(`Error: ${err.message}`);
    process.exit(1);
  }
};

app.listen(config.PORT, () => { process.stdout.write(`App is listening on port ${config.PORT}\n`); });

runApp();
