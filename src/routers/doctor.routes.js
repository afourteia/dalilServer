var express = require("express");
const {
  CreateDoctor,
  UpdateDoctor,
  AllDoctors,
} = require("../controllers/doctorController");
const { authentication, checkAccess } = require(`../utilities/auth`);
var router = express.Router();

router.post("", authentication, CreateDoctor);
router.patch("/:id", UpdateDoctor);
router.get("", authentication, checkAccess, AllDoctors);
module.exports = router;
