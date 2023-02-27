var express = require("express");
const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} = require("../controllers/institutionController");
const { checkToken } = require("../utilities/tokenAuth");
var router = express.Router();

router.post("", AddInstitution);
router.patch("/:institutionId", checkToken, UpdateInstitution);
router.get("", AllInstitutions);
router.get("/:id", checkToken, InstitutionById);
router.delete("/:id", checkToken, DeleteInstitution);
module.exports = router;
