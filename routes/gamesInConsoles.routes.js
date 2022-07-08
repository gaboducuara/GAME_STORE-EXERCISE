const express = require('express');

// controller
const {
	getAllgameInconsoles,
	creategameInconsoles,
	updategameInconsoles,
	deletegameInconsoles,
} = require('../controller/gamesInConsoles.controller');

//Middlewares
const { gamesInConsolesExist } = require('../middlewares/gamesInConsoles.middlewares');

const gameInConsolesRouter = express.Router();

gameInConsolesRouter.get('/', getAllgameInconsoles);
gameInConsolesRouter.post('/', creategameInconsoles);
gameInConsolesRouter.patch('/:id', gamesInConsolesExist, updategameInconsoles);
gameInConsolesRouter.delete('/:id', gamesInConsolesExist, deletegameInconsoles);

module.exports = { gameInConsolesRouter };
