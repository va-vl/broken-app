import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_EXPIRATION_TIME = 60 * 60 * 24;

const createJWT = (id) => jwt.sign(
  { id },
  'lets_play_sum_games_man',
  { expiresIn: JWT_EXPIRATION_TIME }
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

    if (!isMatching) {
      throw new Error('Passwords do not match!');
    }

    const token = createJWT(id);

    return { user, sessionToken: token }
  },
})
