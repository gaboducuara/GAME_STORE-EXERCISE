//models
const { Game } = require('../models/games.model');
//utils
const { AppError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

const gameExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const newGame = await Game.findOne({ where: { id } });

	if (!newGame) {
		return next(new AppError('Game not found', 404));
	}

	req.game = newGame;
	next();
});
module.exports = { gameExist };
