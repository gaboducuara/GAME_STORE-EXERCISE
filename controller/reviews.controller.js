const { Review } = require('../models/reviews.model');
const { User } = require('../models/users.model');
//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllReviews = catchAsync(async (req, res, next) => {
	const Reviews = await Review.findAll({
		attributes: ['name', 'email'],
		include: [{ model: User, attributes: ['id', 'name', 'email'] }],
	});
	res.status(200).json({
		status: 'success',
		Reviews,
	});
});
const createReviews = catchAsync(async (req, res, next) => {
	const { userId, gameId, comment } = req.body;
	const newReview = await Review.create({ comment, gameId, userId });
	res.status(201).json({
		status: 'success',
		newReview,
	});
});
const updateReviews = catchAsync(async (req, res, next) => {
	const { Reviews } = req;
	const { logReviews } = req.body;

	await Reviews.update({ Reviews: logReviews });

	res.status(204).json({
		status: 'success',
	});
});
const deleteReviews = catchAsync(async (req, res, next) => {
	const { logReviews } = req;
	await logReviews.update({ status: 'deleted' });
	res.status(204).json({
		status: 'success',
	});
});

module.exports = { getAllReviews, createReviews, updateReviews, deleteReviews };
