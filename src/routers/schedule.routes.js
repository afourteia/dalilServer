var express = require("express");
const {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
} = require("../controllers/scheduleController");
const { authentication } = require(`../utilities/auth`);

var router = express.Router();

router.post("", authentication, CreateSchedule);
router.patch("/:id", authentication, UpdateSchedule);
router.get("", AllSchedule);
router.get("/:id", authentication, SpecificSchedule);
router.delete("/:id", authentication, DeleteSchedule);
module.exports = router;
