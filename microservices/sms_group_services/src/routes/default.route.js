const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controllers/default.controller");

const router = express.Router();
router.use(bodyParser.json());

router.get('/', controller.default);

module.exports = router;