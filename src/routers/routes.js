var express = require("express");
var router = express.Router();

const userRouter = require("./user.routes");
const userRoleRouter = require("./userRole.routes");
const appointmentRouter = require("./appointment.routes");
const instituteRouter = require("./institution.routes");
const medicalRouter = require("./medicalCenter.routes");
const scheduleRouter = require("./schedule.routes");

router.use("/v1/users", userRouter);
router.use("/v1/roles", userRoleRouter);
router.use("/v1/appointments", appointmentRouter);
router.use("/v1/institutions", instituteRouter);
router.use("/v1/medicalCenters", medicalRouter);
router.use("/v1/schedules", scheduleRouter);

module.exports = router;
