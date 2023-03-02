var express = require("express");
const {
  AddInstitution,
  UpdateInstitution,
  DeleteInstitution,
  InstitutionById,
  AllInstitutions,
} = require("../controllers/institutionController");
const { authentication, checkAccess } = require(`../utilities/auth`);
var router = express.Router();

router.post("/create", authentication, checkAccess, AddInstitution);
router.patch("/:institutionId", authentication, UpdateInstitution);
router.get("", authentication, checkAccess, AllInstitutions);
router.get("/:id", authentication, InstitutionById);
router.delete("/:id", authentication, DeleteInstitution);
module.exports = router;
