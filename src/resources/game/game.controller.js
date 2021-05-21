import { StatusCodes } from 'http-status-codes';
import { Router } from 'express';
//
import {
  routerErrorHandle
} from '../../utils/index.js';

const getId = (req) => req.params.id;
const getOwnerId = (req) => req.user.id;
const getGameProps = (req) => ({
  title: req.body.game.title,
  studio: req.body.game.studio,
  esrb_rating: req.body.game.esrb_rating,
  user_rating: req.body.game.user_rating,
  have_played: req.body.game.have_played,
});

const router = Router();

export default (gameService) => {
  router.get('/all', routerErrorHandle(
    async (req, res) => {
      const owner_id = getOwnerId(req);
      const games = await gameService.getAll(owner_id);

      res.status(StatusCodes.OK).json({
        games,
        message: 'All games fetched',
      });
    }
  ));

  router.get('/:id', routerErrorHandle(
    async (req, res) => {
      const id = getId(id);
      const owner_id = getOwnerId(req);
      const game = await gameService.getById(owner_id, id);

      res.status(StatusCodes.OK).json({
        game,
        message: 'Game fetched',
      });
    }
  ));

  router.post('/create', routerErrorHandle(
    async (req, res) => {
      const owner_id = getOwnerId(req);
      const gameProps = getGameProps(req);
      const game = await gameService.create({
        owner_id, ...gameProps,
      });

      res.status(StatusCodes.OK).json({
        game,
        message: 'Game created',
      });
    }
  ));

  router.put('/update/:id', routerErrorHandle(
    async (req, res) => {
      const id = getId(req);
      const owner_id = getOwnerId(req);
      const gameProps = getGameProps(req);
      const game = await gameService.update({
        id,
        owner_id,
        ...gameProps,
      });

      res.status(StatusCodes.OK).json({
        game,
        message: 'Game updated',
      });
    }
  ));

  router.delete('/remove/:id', routerErrorHandle(
    async (req, res) => {
      const id = getId(req);
      const owner_id = getOwnerId(req);
      const game = await gameService.remove(owner_id, id);

      res.status(StatusCodes.OK).json({
        game,
        message: 'Game deleted',
      });
    }
  ));

  return router;
};
