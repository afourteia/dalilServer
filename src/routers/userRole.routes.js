var express = require("express");
const {
  authentication,
  cookieVerification,
  isAdmin,
} = require(`../utilities/auth`);
const {
  CreateUserRole,
  GetAllRoles,
} = require("../controllers/userRoleController");
var router = express.Router();

router.post("", authentication, CreateUserRole);
router.get("", GetAllRoles);
module.exports = router;
