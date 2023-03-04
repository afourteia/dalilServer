var express = require("express");
const {
  CreateAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.get("", getAllAppointments);
router.post("", checkToken, CreateAppointment);
router.get("/:appointmentId", checkToken, getAppointment);
router.post("/:appointmentId", checkToken, updateAppointment);
router.patch("/:appointmentId", checkToken, updateAppointment);
router.delete("/:appointmentId", checkToken, deleteAppointment);

module.exports = router;
