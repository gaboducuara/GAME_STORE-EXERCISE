const express = require('express');
const { body, validationResult } = require('express-validator');

//controllers
const {
	postCreateUser,
	postLoginUser,
	patchUpdateUser,
	deleteUser,
	getAllUser,
} = require('../controller/users.controller');

//Middlewares
const { createUserValidator } = require('../middlewares/validator.middlewares');
const { userExist } = require('../middlewares/users.middlewares');
const { protecSession, protectUserAccount } = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidator, postCreateUser);

usersRouter.post('/login', postLoginUser);

usersRouter.use(protecSession);

usersRouter
	.use('/:id', userExist)
	.route('/:id')
	.patch(patchUpdateUser, protectUserAccount)
	.delete(deleteUser, protectUserAccount);
// usersRouter.use('/:id', userExist);

// usersRouter.patch('/:id', patchUpdateUser);

// usersRouter.delete('/:id', deleteUser);

usersRouter.get('/', getAllUser);

module.exports = { usersRouter };
