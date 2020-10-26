'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {}

    Genre.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    }, {
        sequelize,
        // Disables the createdAt & updatedAt data that sequelize auto generates 
        timestamps: false,
        modelName: 'genre'
    })

    Genre.associate = (models) => {

        // Creates a many-to-many relation between Genre and Game
        models.Genre.belongsToMany(models.Game, { through: "GameGenres", timestamps: false });

    }

    return Genre;

}