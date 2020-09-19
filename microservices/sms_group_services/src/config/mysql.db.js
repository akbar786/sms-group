'use strict';

const configFile = `${process.env.PWD}/src/config/config.json`;
const config = require(configFile).DATABASE;

config.logging = (msg) => {
  console.log(`Sequelize ${msg}`);
};

module.exports = config;
