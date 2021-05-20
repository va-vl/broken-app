require('dotenv').config();
const express = require('express');
//
const db = require('./src/db');
const user = require('./src/controllers/usercontroller');
const game = require('./src/controllers/gamecontroller');
const validateSession = require('./src/middleware/validate-session');

const PORT = 4000;

const app = express();

db.sync().catch(({ message }) => { console.log(`Error: ${message}`); });

app.use(require('body-parser').json());
app.use('/api/auth', user);
app.use('/api/game', validateSession, game);

app.listen(PORT, () => { process.stdout.write(`App is listening on port ${PORT}\n`); });
