'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notNull: true,
      },
      allowNull: false
    },
    amount: {
      type: DataTypes.BIGINT,
      validate: {
        notNull: true,
      },
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      allowNull: false
    },
    note: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};