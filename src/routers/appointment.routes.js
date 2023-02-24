var express = require("express");
const {
  CreateAppointment,
  UpdateAppointment,
  AllAppointments,
} = require("../controllers/appointmentController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("", checkToken, CreateAppointment);
router.patch("/:appointmentId", checkToken, UpdateAppointment);
router.get("", AllAppointments);
module.exports = router;
