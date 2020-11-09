// Company Model, boilerplate code
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Company extends Model {}

// Company model initialization
    Company.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        year: { type: DataTypes.INTEGER}, 
    }, {
        sequelize,
        // Disables the createdAt & updatedAt data that sequelize auto generates 
        timestamps: false,
        modelName: 'Company'
    });

    Company.associate = (models) => {

        // Creates a one-to-many relationship between Comapny and Game(s) 
        // models.Company.hasMany(models.Game, { through: "GameCompany", timestamps: false });

    }

    return Company;

}