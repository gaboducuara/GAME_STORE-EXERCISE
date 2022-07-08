const { body, validationResult } = require('express-validator');
const { AppError } = require('../utils/appError.util');

// -------------- USER -------------------//s

const usersResult = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMgs = errors.array().map(err => {
			return err.msg;
		});

		const message = errorMgs.join('. ');

		return next(new AppError(message, 400));
	}
	next();
};

const createUserValidator = [
	body('name').notEmpty().withMessage('username cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 characters long'),
	usersResult,
];

//----------------Game-------------------//

const GamesResult = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMgs = errors.array().map(err => {
			return err.msg;
		});

		const message = errorMgs.join('. ');
		return next(new AppError(message, 400));
	}
	next();
};

const createGameValidator = [
	body('title').notEmpty(),
	body('genre').notEmpty(),
	GamesResult,
];

//----------------Console-----------------//

const consoleResult = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorMgs = errors.array().map(err => {
			return err.msg;
		});

		const message = errorMgs.join('. ');
		return next(new AppError(message, 400));
	}
	next();
};

const createConsoleValidator = [
	body('name').notEmpty().withMessage('name cannot be empty'),
	body('company').notEmpty(),
	consoleResult,
];

//----------------Reviews------------------//

//-------------gameInConsole--------------//

module.exports = { createUserValidator, createGameValidator, createConsoleValidator };
