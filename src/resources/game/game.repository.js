import { EntityNotFoundError } from '../../errors/index.js';

const checkIsAbsent = (game, absentCondition) => {
  if (game === absentCondition) {
    throw new EntityNotFoundError('Game');
  }
};

export default (gameModel) => ({
  getAll: async (owner_id) => {
    const games = await gameModel.findAll({
      where: { owner_id },
    });

    return games;
  },

  getById: async (owner_id, id) => {
    const game = await gameModel.findOne({
      where: { id, owner_id },
    });

    checkIsAbsent(game, null);

    return game;
  },

  create: async ({
    title,
    owner_id,
    studio,
    esrb_rating,
    user_rating,
    have_played,
  }) => {
    const game = await gameModel.create({
      title,
      owner_id,
      studio,
      esrb_rating,
      user_rating,
      have_played,
    });

    return game;
  },

  update: async ({
    title,
    studio,
    esrb_rating,
    user_rating,
    have_played,
    id,
    owner_id,
  }) => {
    const game = await gameModel.update(
      {
        title,
        studio,
        esrb_rating,
        user_rating,
        have_played,
      },
      {
        where: {
          id,
          owner_id,
        },
      },
    );

    checkIsAbsent(game[0], 0);

    return game;
  },

  remove: async (owner_id, id) => {
    const game = await gameModel.destroy({
      where: { id, owner_id },
    });

    checkIsAbsent(game, 0);

    return game;
  },
});
