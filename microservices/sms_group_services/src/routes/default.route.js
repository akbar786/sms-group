const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/default.controller");

const router = express.Router();
router.use(bodyParser.json());

router.get('/', controller.default);

router.get('/city', controller.getCity);
router.post('/city', controller.addCity);
router.put('/city/:id', controller.updateCity);
router.delete('/city/:id', controller.deleteCity);

module.exports = router;