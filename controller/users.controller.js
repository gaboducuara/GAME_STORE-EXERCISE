const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models
const { User } = require('../models/users.model');
const { Review } = require('../models/reviews.model');

//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ patch: './config.env' });

const postCreateUser = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	//hash password
	const salt = await bcrypt.genSalt(15);
	const hasPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		email,
		password: hasPassword,
	});

	//Remove password from response
	newUser.password = undefined;

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const postLoginUser = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ where: { email, status: 'active' } });

	if (!user) {
		return next(new AppError('Credentials invalid', 404));
	}
	//Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	//Generate JWT --- sign se encarga de generar el token
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({
		status: 'success',
		token,
	});
});

const patchUpdateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name, email } = req.body;

	await user.update({ name, email, status: 'out' });
	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	await user.update({ status: 'cancelled' });
	res.status(204).json({ status: 'success' });
});

const getAllUser = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		attributes: ['name', 'email'],
		// include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	res.status(200).json({
		status: 'success',
		users,
	});
});

module.exports = {
	postCreateUser,
	postLoginUser,
	patchUpdateUser,
	deleteUser,
	getAllUser,
};
