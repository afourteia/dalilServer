const InstitutionSchema = require("../schemas/institutionSchema");

exports.createInstitution = async (query) => {
  return await InstitutionSchema.create(query);
};

exports.updateInstitution = async (query, data) => {
  return await InstitutionSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteInstitution = async (query) => {
  return await InstitutionSchema.findOneAndDelete(query);
};

exports.getAllInstitution = async () => {
  return await InstitutionSchema.find().sort({ _id: -1 }).select("-__v");
};

exports.getInstitutionDetails = async (query) => {
  return await InstitutionSchema.findOne(query).select(
    "-__v -createdAt -updatedAt"
  );
};
