//Models
const { Console } = require('../models/consoles.model');
const { User } = require('../models/users.model');
const { Game } = require('../models/games.model');
const { GameInconsole } = require('../models/gamesInConsoles.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const postCreateConsole = catchAsync(async (req, res, next) => {
	const { name, company } = req.body;
	const newConsole = await Console.create({
		name,
		company,
	});
	res.status(201).json({ newConsole });
});

const getAllConsole = catchAsync(async (req, res, next) => {
	const game = await Console.findAll({
		attributes: ['name', 'email'],
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	res.status(200).json({
		status: 'success',
		game,
	});
});

const patchUpdateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;
	await console.update({ name, status: 'out' });
	res.status(204).json({ status: 'success' });
});

const deleteConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	await console.update({ status: 'cancelled' });
	res.status(204).json({ status: 'success' });
});

const assigngamesInconsole = catchAsync(async (req, res, next) => {
	const { gameId, consoleId } = req.body;

	const logGameInconsole = await GameInconsole.create({ gameId, consoleId });
	res.status(201).json({
		status: 'success',
		logGameInconsole,
	});
});

module.exports = {
	postCreateConsole,
	getAllConsole,
	patchUpdateConsole,
	deleteConsole,
	assigngamesInconsole,
};
