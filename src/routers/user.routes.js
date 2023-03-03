var express = require("express");
const {
  CreateUser,
  GetUsers,
  UpdateUser,
  GetAll,
  Login,
  Logout,
  RegisterAppToken,
  SendNotification,
  SendNotificationToUsers,
} = require("../controllers/userController");
const { checkToken } = require("../utilities/tokenAuth");
const { authentication, checkAccess } = require(`../utilities/auth`);
var router = express.Router();

router.post("/login", Login);
// router.post("/signup", UserSignUp);
router.post("", authentication, checkAccess, CreateUser);
router.patch("/:id", UpdateUser);
router.get("", authentication, checkAccess, GetUsers);
router.post("/registerToken", authentication, RegisterAppToken);
router.post("/sendNotification", authentication, SendNotification);
router.post("/sendToAll", SendNotificationToUsers);
router.post("/logout", authentication, Logout);
module.exports = router;
