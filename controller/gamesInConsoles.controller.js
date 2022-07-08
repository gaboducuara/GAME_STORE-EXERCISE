const { GameInconsole } = require('../models/gamesInConsoles.model');
const { User } = require('../models/users.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllgameInconsoles = catchAsync(async (req, res, next) => {
	const gameConsole = await GameInconsole.findAll({
		attributes: ['name', 'email'],
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	res.status(200).json({
		status: 'success',
		gameConsole,
	});
});
const creategameInconsoles = catchAsync(async (req, res, next) => {
	const { gameId, consoleId } = req.body;
	const newGameInconsole = await GameInconsole.create({ gameId, consoleId });
	res.status(201).json({
		status: 'succcess',
		newGameInconsole,
	});
});
const updategameInconsoles = catchAsync(async (req, res, next) => {
	const { gameConsole } = req.body;
	const { loggameConsole } = req;

	await gameConsole.update({ gameConsole: loggameConsole });

	res.status(204).json({
		status: 'success',
	});
});
const deletegameInconsoles = catchAsync(async (req, res, next) => {
	const { loggameConsole } = req;
	await loggameConsole.update({ status: 'deleted' });
	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	getAllgameInconsoles,
	creategameInconsoles,
	updategameInconsoles,
	deletegameInconsoles,
};
