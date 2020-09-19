module.exports = {
  default(req, res, next) {
    console.log('in default controller method');
    res.send({
      status: true,
      message: 'success'
    })
  }
};