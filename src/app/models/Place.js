'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    numberOfVotes: DataTypes.INTEGER,
  });

  Place.associate = function(models) {
    Place.belongsTo(models.User);
  };

  Place.prototype.vote = function() {
    this.numberOfVotes++;
    return this.save();
  }

  return Place;
};