'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};