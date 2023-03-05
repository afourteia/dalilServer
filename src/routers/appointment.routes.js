var express = require("express");
const {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
} = require("../controllers/appointmentController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.get("", getAppointments);
router.post("", checkToken, createAppointment);
router.get("/:appointmentId", checkToken, getAppointment);
router.post("/:appointmentId", checkToken, updateAppointment);
router.patch("/:appointmentId", checkToken, updateAppointment);
router.delete("/:appointmentId", checkToken, deleteAppointment);

module.exports = router;
