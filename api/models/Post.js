"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {}

	Post.init(
		{
			text: {
				type: DataTypes.TEXT
			},
		},
		{
			sequelize,
			modelName: "post",
		}
	);

	Post.associate = (models) => {
		// Creates an association between an user and all their post
		// models.Post.belongsTo(models.User, { foreignKey: "postId"});

		// Creaates an association between an post and all its commments
		models.Post.belongsToMany(models.Comment, {
			through: "PostComments",
		})
	};

	return Post;
};