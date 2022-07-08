const { app } = require('./app');

//models
const { Console } = require('./models/consoles.model');
const { Game } = require('./models/games.model');
const { GameInconsole } = require('./models/gamesInConsoles.model');
const { Review } = require('./models/reviews.model');
const { User } = require('./models/users.model');

//utils
const { db, sequelize } = require('./utils/database.util');
//Database authenticated
db.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

//Establish model´s relations

// 1 User < ----- > M Review
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

//1 Game <---------> M Review
Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);
// -----------------------------------------------//
Game.belongsToMany(Console, { foreignKey: 'consoleId', through: 'gamesinconsoles' });
Console.belongsToMany(Game, { foreignKey: 'gameId', through: 'gamesinconsoles' });

// M Game <---------> M GamesInConsoles

//M consoles < ---------> M gameInConsoles
db.sync()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});
