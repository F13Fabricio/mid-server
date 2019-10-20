'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  });

  Place.associate = function(models) {
    Place.belongsTo(models.User);
  };
  return Place;
};