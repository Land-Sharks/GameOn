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
				allowNull: false,
				unique: true,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					len: [5, 50],
					notEmpty: true,
				},
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					len: [5, 20],
					notEmpty: true,
				},
				allowNull: false
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
