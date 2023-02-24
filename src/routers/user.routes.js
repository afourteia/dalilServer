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
var router = express.Router();

router.post("/login", Login);
// router.post("/signup", UserSignUp);
router.post("", CreateUser);
router.patch("/:id", UpdateUser);
router.get("", GetUsers);
router.post("/registerToken", checkToken, RegisterAppToken);
router.post("/sendNotification", checkToken, SendNotification);
router.post("/sendToAll", SendNotificationToUsers);
router.post("/logout", checkToken, Logout);
module.exports = router;
