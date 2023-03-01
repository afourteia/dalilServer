var express = require("express");
const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} = require("../controllers/institutionController");
const { authentication } = require(`../utilities/auth`);
var router = express.Router();

router.post("", AddInstitution);
router.patch("/:institutionId", authentication, UpdateInstitution);
router.get("", AllInstitutions);
router.get("/:id", authentication, InstitutionById);
router.delete("/:id", authentication, DeleteInstitution);
module.exports = router;
