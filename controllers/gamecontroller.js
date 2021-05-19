const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const router = require('express').Router();
//
const Game = require('../db').import('../models/game');

router.get('/all', (req, res) => {
  const { user: { id } } = req;

  Game.findAll({
    where: { owner_id: id },
  })
    .then(
      (games) => res.status(OK).json({
        games,
        message: 'Data fetched.',
      }),
      (err) => res.status(INTERNAL_SERVER_ERROR).json({
        message: `Error: ${err.message}`,
      }),
    );
});

router.get('/:id', (req, res) => {
  const {
    params: { id },
    user: { id: ownerId },
  } = req.params;

  Game.findOne({
    where: {
      id: id,
      owner_id: ownerId,
    },
  })
    .then(
      (game) => res.status(OK).json({
        game,
        message: 'Data fetched',
      }),
      (err) => res.status(INTERNAL_SERVER_ERROR).json({
        message: `Error: ${err.message}`,
      }),
    );
});

router.post('/create', (req, res) => {
  const {
    body: {
      game: {
        title,
        studio,
        esrb_rating: esrbRating,
        user_rating: userRating,
        have_played: havePlayed,
      },
      user: { id: ownerId },
    },
  } = req;
  Game.create({
    title,
    owner_id: ownerId,
    studio,
    esrb_rating: esrbRating,
    user_rating: userRating,
    have_played: havePlayed,
  })
    .then(
      (game) => res.status(OK).json({
        game,
        message: 'Game created.',
      }),
      (err) => res.status(INTERNAL_SERVER_ERROR).json({
        message: `Error: ${err.message}`,
      }),
    );
});

router.put('/update/:id', (req, res) => {
  const {
    params: { id },
    body: {
      game: {
        title,
        studio,
        esrb_rating: esrbRating,
        user_rating: userRating,
        have_played: havePlayed,
      },
      user: { id: ownerId },
    },
  } = req;

  Game.update({
    title,
    studio,
    esrb_rating: esrbRating,
    user_rating: userRating,
    have_played: havePlayed,
  },
  {
    where: {
      id,
      owner_id: ownerId,
    },
  })
    .then(
      (game) => res.status(OK).json({
        game,
        message: 'Successfully updated.',
      }),
      (err) => res.status(INTERNAL_SERVER_ERROR).json({
        message: `Error: ${err.message}`,
      }),
    );
});

router.delete('/remove/:id', (req, res) => {
  const {
    params: { id },
    user: { id: ownerId },
  } = req;

  Game.destroy({
    where: {
      id,
      owner_id: ownerId,
    },
  })
    .then(
      (game) => res.status(OK).json({
        game,
        message: 'Successfully deleted',
      }),
      (err) => res.status(INTERNAL_SERVER_ERROR).json({
        message: `Error: ${err.message}`,
      }),
    );
});

module.exports = router;
