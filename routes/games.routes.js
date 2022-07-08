const express = require('express');
const { body } = require('express-validator');

//controllers
const {
	postCreateGame,
	getAllGame,
	patchUpdateGame,
	deleteGame,
	postCommentGame,
} = require('../controller/games.controller');

//Middlewares

const { createGameValidator } = require('../middlewares/validator.middlewares');
const { gameExist } = require('../middlewares/games.middlewares');
const { protecSession, protectUserAccount } = require('../middlewares/auth.middleware');

const gamesRouter = express.Router();

gamesRouter.get('/', getAllGame);

gamesRouter.use(protecSession);

gamesRouter.post('/', createGameValidator, postCreateGame);

gamesRouter
	.use('/:id', gameExist)
	.route('/:id')
	.patch(patchUpdateGame, protectUserAccount)
	.delete(deleteGame, protectUserAccount);

// gamesRouter.use('/:id', gameExist);

// gamesRouter.patch('/:id', gameExist, patchUpdateGame);

// gamesRouter.delete('/:id', gameExist, deleteGame);

gamesRouter.post('/reviews/:gameId', postCommentGame);

module.exports = { gamesRouter };
