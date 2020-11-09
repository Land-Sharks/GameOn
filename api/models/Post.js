"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {}

	Post.init(
		{
			text: {
				type: DataTypes.STRING
			},
		},
		{
			sequelize,
			modelName: "post",
		}
	);

	Post.associate = (models) => {
		models.Post.belongsTo(models.User, {
			through: "UserPosts",
		});
	};

	return Post;
};