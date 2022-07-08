//models
const { GameInconsole } = require('../models/gamesInConsoles.model');
//utils
const { AppError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

gamesInConsolesExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const gameConsole = await GameInconsole.findOne({ where: { id } });

	if (!gameConsole) {
		return next(new AppError('Console game not found', 404));
	}
	req.loggameConsole = gameConsole;
	next();
});

module.exports = { gamesInConsolesExist };
