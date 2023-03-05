var express = require("express");
const {
  logout
} = require("../controllers/userController");
var router = express.Router();

router.post("", logout);


module.exports = router;
