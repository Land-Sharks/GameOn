'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {}

    Game.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        sequelize,
        // Disables the createdAt & updatedAt data that sequelize auto generates 
        timestamps: false,
        modelName: 'game'
    });

    Game.associate = (models) => {

        // Creates a many-to-many relation between Game and Genre
        models.Game.belongsToMany(models.Genre, { through: "GameGenres", timestamps: false });

    }

    return Game;

}