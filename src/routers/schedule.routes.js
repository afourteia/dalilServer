var express = require("express");
const {
  CreateSchedule,
  UpdateSchedule,
  SpecificSchedule,
  DeleteSchedule,
  AllSchedule,
} = require("../controllers/scheduleController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("", checkToken, CreateSchedule);
router.patch("/:id", checkToken, UpdateSchedule);
router.get("", AllSchedule);
router.get("/:id", checkToken, SpecificSchedule);
router.delete("/:id", checkToken, DeleteSchedule);
module.exports = router;
