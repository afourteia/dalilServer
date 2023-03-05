const SubscriberSchema = require("../schemas/subscriberSchema");

exports.createSubscriber = async (query) => {
  return await SubscriberSchema.create(query);
};

exports.updateSubscriber = async (query, data) => {
  return await SubscriberSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteSubscriber = async (query) => {
  return await SubscriberSchema.findOneAndDelete(query);
};

exports.getSubscribers = async (filter, sort, skip, limit) => {
  
  documentsCount = await SubscriberSchema.find(filter)
  .count(sort);

  documents = await SubscriberSchema.find(filter)
  .sort(sort)
  .skip(skip)
  .limit(limit)
  .select("-__v")
  .lean();

  return [documents, documentsCount];
};

exports.getSubscriber = async (query) => {
  return await SubscriberSchema.findOne(query).select("-__v");
};

exports.updateSubscriberById = async (query, data) => {
  return await SubscriberSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};
