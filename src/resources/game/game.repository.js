export default (gameModel) => ({
  getAll: async (owner_id) => {
    const games = await gameModel.findAll({
      where: { owner_id }
    });

    return games;
  },

  getById: async (owner_id, id) => {
    const game = await gameModel.findOne({
      where: { id, owner_id }
    });

    if (game === null) {
      throw new Error('Error: game not found');
    }

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
    owner_id
  }) => {
    const game = await gameModel.update({
      title,
      studio,
      esrb_rating,
      user_rating,
      have_played,
    },
    {
      where: {
        id,
        owner_id
      },
    });

    if (game[0] === 0) {
      throw new Error('Error: game not found');
    }

    return game;
  },

  remove: async (owner_id, id) => {
    const game = await gameModel.destroy({
      where: { id, owner_id },
    });

    if (game === 0) {
      throw new Error('Error: game not found');
    }

    return game;
  },
});
