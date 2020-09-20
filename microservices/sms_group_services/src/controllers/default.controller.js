const cityHelper = require('../helpers/city.helper');

module.exports = {
  default(req, res, next) {
    console.log('in default controller method');
    res.send({
      status: true,
      message: 'success'
    })
  },
  async addCity(req, res, next) {
    try {
      await cityHelper.saveNewCity(req.body);
      res.send({
        status: true,
        message: 'successfully added'
      });  
    } catch (error) {
      console.error(error);
      res.send({
        status: false,
        message: 'failed to save',
        data: error
      });  
    }
  },
  async updateCity(req, res, next) {
    try {
      let id = req.params.id;
      let city = req.body;
      await cityHelper.updateCity(id, city);
      res.send({
        status: true,
        message: 'successfully updated city : ' + id
      });  
    } catch (error) {
      console.error(error);
      res.send({
        status: false,
        message: 'failed to udpate',
        data: error
      });
    }
    
  },
  async deleteCity(req, res, next) {
    try {
      let id = req.params.id;
      await cityHelper.deleteCity(id);
      res.send({
        status: true,
        message: 'successfully deleted city : ' + id
      });
    } catch (error) {
      console.error(error);
      res.send({
        status: false,
        message: 'failed to delete',
        data: error
      });
    }
    
  },
  async getCity(req, res, next) {
    try {

      let fromDate = req.query.fromDate || null;
      let toDate = req.query.toDate || null;
      let sortBy = req.query.sortBy || 'id';
      let sortOrder = req.query.sortOrder || 'ASC';
      let page = req.query.page || 1;
      let limit = req.query.limit || 20;

      const cities = await cityHelper.fetchCity(fromDate, toDate, sortBy, sortOrder, parseInt(page), parseInt(limit));

      res.send({
        status: true,
        message: 'successfully retrived',
        data: cities
      });  
    } catch (error) {
      console.error(error);
      res.send({
        status: false,
        message: 'failed to retrive data',
        data: error
      });
    }
    
  }
};