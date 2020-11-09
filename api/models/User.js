"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

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
			passwordHash: { 
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.VIRTUAL,
				validate: {
					isLongEnough: (val) => {
						if(val.length < 7) {
							throw new Error("Please choose a longer password");
						}
					},
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

	User.beforeSave((user, options) => {
		if (user.password) {
			user.passwordHash = bcrypt.hashSync(user.password, 10);
		}
	});

	return User;
};
