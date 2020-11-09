"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {}

	Post.init(
		{
			postContent: {
				type: DataTypes.STRING,
				unique: true,
			},
		},
		{
			sequelize,
			// Disables the createdAt & updatedAt data that sequelize auto generates
			timestamps: false,
			modelName: "genre",
		}
	);

	Post.associate = (models) => {
		// Creates a many-to-many relation between Genre and Game
		// models.Post.belongsToOne(models.User, {
		// 	through: "Users",
		// 	timestamps: false,
		// });
	};

	return Post;
};
