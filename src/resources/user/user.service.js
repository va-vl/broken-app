import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//
import * as config from '../../config/index.js';

const createJWT = (id) => jwt.sign(
  { id },
  config.JWT_KEY,
  { expiresIn: config.JWT_EXPIRATION_TIME }
);

export default (userRepository) => ({
  signup: async ({ full_name, username, password, email }) => {
    const user = await userRepository.create({
      full_name,
      username,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
    });
    const token = createJWT(user.id);

    return { user, token };
  },

  signin: async function(username, password) {
    const user = await userRepository.getByUserName(username);
    const { passwordHash, id } = user;
    const isMatching = bcrypt.compareSync(password, passwordHash);

    if (isMatching) {
      throw new Error('Passwords do not match!');
    }

    const token = createJWT(id);

    return { user, sessionToken: token }
  },
})
