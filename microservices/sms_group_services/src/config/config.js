'use strict';

const fs = require('fs');

const defaultConfigFile = `${process.env.PWD}/src/config/config.json.default`;
const configFile = `${process.env.PWD}/src/config/config.json`;

if (!fs.existsSync(configFile)) {
  fs.copyFileSync(defaultConfigFile, configFile);
}

const envConfig = require(configFile);

console.log(`setting environment variables from file ${configFile}`);

Object.keys(envConfig).forEach((key) => {
  let val = envConfig[key];
  if (typeof envConfig[key] === 'object') {
    val = JSON.stringify(val);
  }
  process.env[key] = val;
});
