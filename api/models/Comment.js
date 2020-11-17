"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes ) => {
    class Comment extends Model {}

    Comment.init(
        {
            text: {
                type: DataTypes.STRING
            },
        },
        {
            sequelize,
            modelName: "comment",
        }
    );

    Comment.associate = (models) => {
        models.Comment.belongsTo(models.User, {
            through: "UserComments",
        });

        models.Comment.belongsTo(models.Post, {
            through: "PostComments",
        });
    };

    return Comment;

}