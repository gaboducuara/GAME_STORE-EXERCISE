//Models
const { Game } = require('../models/games.model');
const { User } = require('../models/users.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const postCreateGame = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;
	const newGame = await Game.create({
		title,
		genre,
	});
	res.status(201).json({ newGame });
});

const getAllGame = catchAsync(async (req, res, next) => {
	const game = await Game.findAll({
		attributes: ['name', 'email'],
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	res.status(200).json({ game });
});

const patchUpdateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;
	await game.update({ title, status: 'out' });
	res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	await game.update({ status: 'cancelled' });
	res.status(204).json({ status: 'success' });
});

const postCommentGame = catchAsync(async (req, res, next) => {
	const { comment } = req.body;
	const newPost = await Game.create({
		comment,
	});
	res.status(201).json({ newPost });
});

module.exports = {
	postCreateGame,
	getAllGame,
	patchUpdateGame,
	deleteGame,
	postCommentGame,
};
