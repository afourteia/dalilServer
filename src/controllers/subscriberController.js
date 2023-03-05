const SubscriberServices = require("../services/SubscriberServices");
const {
  successResponse,
  serverErrorResponse,
  badRequestErrorResponse,
} = require("../utilities/response");
const { messageUtil } = require("../utilities/message");

const createSubscriber = async (req, res) => {
  try {
    console.log("createSubscriber");
    const doc = await SubscriberServices.createSubscriber({ ...req.body });
    return successResponse(res, messageUtil.resourceCreated, doc);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const updateSubscriber = async (req, res) => {
  try {
    // Update document and register the user
    // const document = await SubscriberServices.updateSubscriber()

    return res.status(200).json(messageUtil.methodUnderDev);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getSubscribers = async (req, res) => {
  try {
    console.log("getSubscribers");
    let limitQP = Number(req.query.limit) ?? 100;
    if (limitQP > 100) limitQP = 100;
    if (limitQP < 1) limitQP = 1;

    let skipQP = Number(req.query.skip) ?? 0;
    if (skipQP < 0) skipQP = 0;

    let sortByQP = Number(req.query.sortBy) ?? { userId: 1 };

    const filterQP = null; // temporary

    const [docArray, docCount] = await SubscriberServices.getSubscribers(
      filterQP,
      sortByQP,
      skipQP,
      limitQP
    );

    let message = "good";
    if (docArray.length === 0) message = "list is empty change your query";

    return successResponse(res, message, docArray, docCount);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

const getSubscriber = async (req, res) => {};
const deleteSubscriber = async (req, res) => {};

module.exports = {
  createSubscriber,
  updateSubscriber,
  getSubscriber,
  deleteSubscriber,
  getSubscribers,
};
