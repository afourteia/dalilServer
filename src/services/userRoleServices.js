const UserRoleSchema = require("../schemas/userRoleSchema");

exports.createUserRole = async (query) => {
  return await UserRoleSchema.create(query);
};

exports.updateUserRole = async (query, data) => {
  return await UserRoleSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteUserRole = async (query) => {
  return await UserRoleSchema.findOneAndDelete(query);
};

exports.getAllUserRoles = async (query, limit) => {
  return await UserRoleSchema.find(query);
};

exports.getUserRoleDetails = async (query) => {
  return await UserRoleSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
