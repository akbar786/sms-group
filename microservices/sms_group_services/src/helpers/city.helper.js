const { updateCity, getCity } = require('../controllers/default.controller');
const db = require('../db/models/index');
module.exports = {
  async fetchCity(fromDate = null, toDate = null, sortBy = 'id', sortOrder = 'DESC', page = 1, limit = 20) {
    let where = {};

    try {
      if (fromDate !== null) {
        where.start_date = {
          [db.Sequelize.Op.gte]: fromDate
        }
      }  
    } catch (error) {
      
    }

    try {
      if (toDate !== null) {
        where.end_date = {
          [db.Sequelize.Op.lte]: toDate
        }
      }  
    } catch (error) {
      
    }

    let count = await db.City.count({where});

    let total_pages = 1;
    if (count > 0) {
      total_pages = Math.ceil(count / limit);
    } else {
      total_pages = 0;
    }

    if (page > total_pages) {
      page = total_pages;
    } else if(page <= 0) {
      page = 1;
    }

    let offset = limit * page - limit;

    if (offset < 0) {
      offset = 0;
    }

    let obj = {
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]]
    };

    const result = await db.City.findAll(obj);

    return {
      page,
      total_pages,
      count,
      data: result
    };
  },
  async getCity(id) {
    return await db.City.findOne({
      attributes: ['id', 'city', 'start_date', 'end_date', 'price', 'status', 'color'],
      where: {
        id
      }
    });
  },
  async saveNewCity(cityObj) {
    const cityModel = new db.City(cityObj);
    return await cityModel.save();
  },
  async updateCity(id, cityObj) {
    return await db.City.update(cityObj, {
      where: {
        id
      }
    });
  },
  async deleteCity(id) {
    return await db.City.destroy({
      where: {
        id
      }
    });
  }
}