var express = require("express");
const {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
} = require("../controllers/subscriberController");
const { authentication } = require("../utilities/auth");
var router = express.Router();

router.get("",authentication, getSubscribers);
router.post("", authentication, createSubscriber);
router.get("/:subscriberId", authentication, getSubscriber);
router.post("/:subscriberId", authentication, updateSubscriber);
router.patch("/:subscriberId", authentication, updateSubscriber);
router.delete("/:subscriberId", authentication, deleteSubscriber);


module.exports = router;
