'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require(`${process.env.PWD}/data.json`);
    data.forEach(element => {
      let startDate = element['start_date'].split('/');
      element['start_date'] = `${startDate[2]}-${startDate[0]}-${startDate[1]}`;
      let endDate = element['end_date'].split('/');
      element['end_date'] = `${endDate[2]}-${endDate[0]}-${endDate[1]}`;
    });
    return await queryInterface.bulkInsert('Cities', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Cities', null, {});
  }
};
