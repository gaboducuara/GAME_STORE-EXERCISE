//models
const { User } = require('../models/users.model');
//utils
const { AppError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

const userExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const newUser = await User.findOne({ where: { id } });

	if (!newUser) {
		return next(new AppError('new User no found', 404));
	}

	req.user = newUser;
	next();
});
module.exports = { userExist };
