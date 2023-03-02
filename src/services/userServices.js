const UserSchema = require("../schemas/userSchema");

exports.createUser = async (query) => {
  return await UserSchema.create(query);
};

exports.updateUser = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteUser = async (query) => {
  return await UserSchema.findOneAndDelete(query);
};

exports.getAllUsers = async (query, limit) => {
  return await UserSchema.find(query)
    .sort({ userId: -1 })
    .limit(limit)
    .populate("userRole")
    .select("-__v -password -sd");
};

exports.getUserDetails = async (query) => {
  return await UserSchema.findOne(query)
    .populate("userRole")
    .select("-__v -createdAt -updatedAt");
};

exports.updateUserById = async (query, data) => {
  return await UserSchema.findOneAndUpdate(query, data, {
    new: true,
  }).select("-__v -createdAt -updatedAt");
};
