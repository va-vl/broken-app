# Broken App Task

An application for storing and tracking video games. Features authorization and login functionality.

## Installation and launch

1. Open terminal;
2. `git clone https://github.com/va-z/broken-app.git -b task-3/debug-in-node-js`;
3. `cd ./broken-app`;
4. `npm install`;
5. `touch .env`;

Inside the `.env` file, set the following environment variables:

- **DB_HOST** - host of your database;
- **DB** - name of your database;
- **DB_USER** - your username;
- **DB_PASSWORD** - your database password;

App is ready to run.

### Versions and improvements

This app was extensively refactored. Part of that process was cleaning up HTTP status codes and sending errors when entities were not found / corrupted. **Slightly different status codes and 404 errors sent when trying to get / update / remove non-existing games are a feature!**

If your want to use the app with as little changes as possible, use `git checkout b0f880c3`. Don't forget to quit _detached HEAD_ state once you're done! Use `git checkout task-3/debug-in-node-js` to move to the latest refactored version.

## Endpoints

- POST `/api/auth/signup` - to create user;
- POST `/api/auth/signin` - to sign in;
- GET `/game/all` - fetch all games owned by the currently authorized user;
- GET `/game/:id` - fetch the game with _id_ if it's owned by the currently authorized user;
- POST `/game/create` - add a game to the currently authorized user's collection;
- PUT `/game/update/:id` - update the game if it's owned by the currently authorized user;
- DELETE `/game/remove/:id` - remove the game from the currently authorized user's collection if they own it.
