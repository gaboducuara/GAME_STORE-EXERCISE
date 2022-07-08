//models
const { Review } = require('../models/reviews.model');
//utils
const { AppError } = require('../utils/appError.util');
//catchAsync
const { catchAsync } = require('../utils/catchAsync.util');

reviewsExist = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const Reviews = await Review.findOne({ where: { id } });

	if (!Reviews) {
		return next(new AppError('Reviews not found', 404));
	}
	req.logReviews = Reviews;
	next();
});

module.exports = { reviewsExist };
