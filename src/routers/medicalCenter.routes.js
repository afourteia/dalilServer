var express = require("express");
const {
  CreateMedicalCenter,
  SingleMedicalCenter,
  UpdateMedicalCenter,
  DeleteMedicalCenter,
  AllMedicalCenter,
} = require("../controllers/medicalCenterController");
const { authentication, checkAccess } = require(`../utilities/auth`);
var router = express.Router();

router.post("", authentication, checkAccess, CreateMedicalCenter);
router.patch("/:medicalCenterId", authentication, UpdateMedicalCenter);
router.get("", checkAccess, AllMedicalCenter);
router.get("/:id", authentication, SingleMedicalCenter);
router.delete("/:medicalCenterId", authentication, DeleteMedicalCenter);
module.exports = router;
