const express = require('express');

//Routers
const { consolesRouter } = require('./routes/consoles.routes');
const { gamesRouter } = require('./routes/games.routes');
const { gameInConsolesRouter } = require('./routes/gamesInConsoles.routes');
const { reviewsRouter } = require('./routes/reviews.routes');
const { usersRouter } = require('./routes/users.routes');

//Global err controller
const { globalErrorHandler } = require('./controller/error.controller');

//utils
const { AppError } = require('./utils/appError.util');

//Init app
const app = express();

//accept incoming json data
app.use(express.json());

//Endpoints
app.use('/api/v1/console', consolesRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/gameInConsoles', gameInConsolesRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404));
});

//Global error Handler
app.use(globalErrorHandler);

module.exports = { app };
