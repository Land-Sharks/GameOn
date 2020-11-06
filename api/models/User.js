"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}

	User.init(
		{
			username: {
				type: DataTypes.STRING,
				validate: {
					len: [5, 20],
					notEmpty: true,
				},
				unique: true,
			},
			firstName: {
				type: DataTypes.STRING,
			},
			lastName: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					len: [5, 50],
					notEmpty: true,
				},
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					len: [5, 20],
					notEmpty: true,
				},
			},
			about: {
				type: DataTypes.BLOB,
			},
		},
		{
			sequelize,
			modelName: "user",
		}
	);

	User.associate = (models) => {};

	return User;
};
