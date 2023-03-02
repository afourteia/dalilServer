var express = require("express");
const {
  authentication,
  cookieVerification,
  isAdmin,
} = require(`../utilities/auth`);
const {
  CreateUserRole,
  GetAllRoles,
  UpdateUserRole,
} = require("../controllers/userRoleController");
var router = express.Router();

router.post("", authentication, CreateUserRole);
router.get("", GetAllRoles);
router.patch("/:id", UpdateUserRole);

module.exports = router;
