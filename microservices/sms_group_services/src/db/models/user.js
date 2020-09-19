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
    city: DataTypes.STRING,
    start_date: DataTypes.Date,
    end_date: DataTypes.Date,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};