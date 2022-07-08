const express = require('express');
const { body } = require('express-validator');

//controllers
const {
	postCreateConsole,
	getAllConsole,
	patchUpdateConsole,
	deleteConsole,
	assigngamesInconsole,
} = require('../controller/consoles.controller');

//Middlewares
const { createConsoleValidator } = require('../middlewares/validator.middlewares');
const { consoleExist } = require('../middlewares/consoles.middlewares');
const { protecSession, protectUserAccount } = require('../middlewares/auth.middleware');
const { usersRouter } = require('./users.routes');

const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsole);

consolesRouter.use(protecSession);

consolesRouter.post('/', createConsoleValidator, postCreateConsole);

consolesRouter.post('/asssign-games', assigngamesInconsole);

usersRouter
	.use('/:id', consoleExist)
	.route('/:id')
	.patch(patchUpdateConsole, protectUserAccount)
	.delete(deleteConsole, protectUserAccount);

// consolesRouter.use('/:id', consoleExist);

// consolesRouter.patch('/:id', consoleExist, patchUpdateConsole);

// consolesRouter.delete('/:id', consoleExist, deleteConsole);

module.exports = { consolesRouter };
