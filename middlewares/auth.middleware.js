const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.model');

// utils
const { catchAsync } = require('../utils/catchAsync.util.js');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const protecSession = catchAsync(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split('Bearer ')[1];
	}

	if (!token) {
		return next(new AppError('Invalid token', 403));
	}

	//Ask JWT (Library), if the token is stil valid---- ESTA LINEA DE CODIGO SIRVE PARA VALIDAR EL LOGIN
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findOne({ where: { id: decoded.id, status: 'active' } });

	if (!user) {
		return next(new AppError('The owner of this token doesn´t exist anymore', 403));
	}

	//Grant access
	req.sessionUser = user;
	next();
});

const protectUserAccount = (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return next(new AppError('You do not own this account', 403));
	}

	next();
};

module.exports = { protecSession, protectUserAccount };
