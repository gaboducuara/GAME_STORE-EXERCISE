const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
console.log(process.env.DB);

const db = new Sequelize({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB,
	dialect: 'postgres',
	logging: false,
});

module.exports = { db, DataTypes, Sequelize };
