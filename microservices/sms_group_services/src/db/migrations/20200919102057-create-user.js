'use strict';

const SELDOM =  'Seldom';
const YEARLY = 'Yearly';
const OFTEN = 'Often';
const NEVER = 'Never';
const ONCE = 'Once';
const WEEKLY = 'Weekly';
const MONTHLY = 'Monthly';
const DAILY = 'Daily';  

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      start_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      end_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        type: Sequelize.ENUM(SELDOM, YEARLY, OFTEN, NEVER, ONCE, WEEKLY, MONTHLY, DAILY),
        defaultValue: SELDOM,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cities');
  }
};