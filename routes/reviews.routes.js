const express = require('express');

//controller
const {
	getAllReviews,
	createReviews,
	updateReviews,
	deleteReviews,
} = require('../controller/reviews.controller');

//Middlewares
const { reviewsExist } = require('../middlewares/reviews.middlewares');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);
reviewsRouter.post('/', createReviews);
reviewsRouter.patch('/:id', reviewsExist, updateReviews);
reviewsRouter.delete('/:id', reviewsExist, deleteReviews);

module.exports = { reviewsRouter };
