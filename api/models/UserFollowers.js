"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserFollowers extends Model {}

    UserFollowers.init({

    }, {
        sequelize, 
        modelName: "userFollowers"
    });

    UserFollowers.associate = (models) => {

    }

    return UserFollowers;

}