var express = require("express");
var router = express.Router();

const userRouter = require("./user.routes");
const userRoleRouter = require("./userRole.routes");
const appointmentRouter = require("./appointment.routes");
const instituteRouter = require("./institution.routes");
const medicalRouter = require("./medicalCenter.routes");
const scheduleRouter = require("./schedule.routes");

router.use("/user", userRouter);
router.use("/roles", userRoleRouter);
router.use("/appointment", appointmentRouter);
router.use("/institute", instituteRouter);
router.use("/medical", medicalRouter);
router.use("/schedule", scheduleRouter);

module.exports = router;
