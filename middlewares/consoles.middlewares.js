//models
const { Console } = require('../models/consoles.model');
//utils
const { AppError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

const consoleExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const newConsole = await Console.findOne({ where: { id } });

	if (!newConsole) {
		return next(new AppError('New Console no found', 404));
	}

	req.console = newConsole;
	next();
});
module.exports = { consoleExist };
