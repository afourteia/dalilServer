const DoctorSchema = require("../schemas/doctorSchema");

exports.createDoctor = async (query) => {
  return await DoctorSchema.create(query);
};

exports.updateDoctor = async (query, data) => {
  return await DoctorSchema.findOneAndUpdate(query, data, {
    new: true,
  });
};

exports.deleteDoctor = async (query) => {
  return await DoctorSchema.findOneAndDelete(query);
};

exports.getAllDoctor = async () => {
  return await DoctorSchema.find().sort({ _id: -1 }).select("-__v");
};

exports.getDoctorDetails = async (query) => {
  return await DoctorSchema.findOne(query).select("-__v -createdAt -updatedAt");
};
