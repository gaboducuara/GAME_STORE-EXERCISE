const { db, DataTypes, Sequelize } = require('../utils/database.util');

const { Game } = require('./games.model');
const { Console } = require('./consoles.model');

const GameInconsole = db.define('gamesinconsoles', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	gameId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	consoleId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});
module.export = { GameInconsole };
