'use strict';

const SELDOM =  'Seldom';
const YEARLY = 'Yearly';
const OFTEN = 'Often';
const NEVER = 'Never';
const ONCE = 'Once';
const WEEKLY = 'Weekly';
const MONTHLY = 'Monthly';
const DAILY = 'Daily';  

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  City.init({
    city: DataTypes.STRING,
    start_date: DataTypes.Date,
    end_date: DataTypes.Date,
    price: DataTypes.DECIMAL(10, 2),
    status: DataTypes.ENUM(SELDOM, YEARLY, OFTEN, NEVER, ONCE, WEEKLY, MONTHLY, DAILY),
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City'
  });
  return City;
};