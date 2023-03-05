var express = require("express");
const {
  login
} = require("../controllers/userController");
var router = express.Router();

router.post("", login);


module.exports = router;
