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
    city: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      required: true,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      required: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(SELDOM, YEARLY, OFTEN, NEVER, ONCE, WEEKLY, MONTHLY, DAILY),
      defaultValue: SELDOM
    },
    color: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'City'
  });
  return City;
};