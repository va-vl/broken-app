const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
//
const Game = require('../db').import('../models/game');
const { createErrorResponseHandler } = require('../utils/create-response');

router.get('/all', (req, res) => {
  const { user: { id: ownerId } } = req;

  Game.findAll({
    where: { owner_id: ownerId },
  })
    .then(
      (games) => res.status(StatusCodes.OK).json({
        games,
        message: 'Data fetched.',
      }),
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
    );
});

router.get('/:id', (req, res) => {
  const {
    params: { id },
    user: { id: ownerId },
  } = req;

  Game.findOne({
    where: {
      id: id,
      owner_id: ownerId,
    },
  })
    .then(
      (game) => res.status(StatusCodes.OK).json({
        game,
        message: 'Data fetched',
      }),
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
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
    },
    user: { id: ownerId },
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
      (game) => res.status(StatusCodes.OK).json({
        game,
        message: 'Game created.',
      }),
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
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
    },
    user: { id: ownerId },
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
      (game) => res.status(StatusCodes.OK).json({
        game,
        message: 'Successfully updated.',
      }),
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
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
      (game) => res.status(StatusCodes.OK).json({
        game,
        message: 'Successfully deleted',
      }),
      createErrorResponseHandler(res, StatusCodes.INTERNAL_SERVER_ERROR),
    );
});

module.exports = router;
