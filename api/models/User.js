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

	User.associate = (models) => {

		// Creates an association between one user and all their posts
		models.User.hasMany(models.Post, {
			foreignKey: 'userId',
		});
		
		// Creates an association between one user and all their comments
		models.User.belongsToMany(models.Comment, {
			through: "UserComments",
		});

		// Creates an assocation between one user and all theirs games they follow
		models.User.belongsToMany(models.Game, {
			through: "UserGames",
		});

	};

	User.beforeSave((user, options) => {
		if (user.password) {
			user.passwordHash = bcrypt.hashSync(user.password, 10);
		}
	});

	return User;
};
