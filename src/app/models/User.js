'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 10);
          user.password = undefined;
        }
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Place);
  };

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
