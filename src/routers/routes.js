var express = require("express");
var router = express.Router();

const usersRouter = require("./user.routes");
const userRolesRouter = require("./userRole.routes");
const appointmentsRouter = require("./appointment.routes");
const institutesRouter = require("./institution.routes");
const medicalCentersRouter = require("./medicalCenter.routes");
const schedulesRouter = require("./schedule.routes");

router.use("/login", usersRouter);
router.use("/logout", usersRouter);
router.use("/users", usersRouter);
router.use("/userRoles", userRolesRouter);
router.use("/appointments", appointmentsRouter);
router.use("/institutions", institutesRouter);
router.use("/medicalCenters", medicalCentersRouter);
router.use("/schedules", schedulesRouter);
router.use("/claims", claimsRouter);



module.exports = router;
