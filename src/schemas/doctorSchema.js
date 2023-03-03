// importing mongooose for doctorSchema and collection setups
const mongoose = require(`mongoose`);

// doctor schema setup
const doctorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, `please enter valid first name`],
    },
    middleName: {
      type: String,
      required: [true, `please enter valid middle name`],
    },
    lastName: {
      type: String,
      required: [true, `please enter valid last name`],
    },
    speciality: {
      type: String,
      required: [true, `please enter valid specialty`],
    },
    level: {
      type: String,
      required: [true, `please enter valid level`],
    },
    gender: {
      type: String,
      required: [true, `please enter valid gender`],
    },
    birthdate: {
      type: String,
      required: [true, `please enter valid birthdate`],
    },
    fieldNames: { type: Array },
    originalNames: { type: Array },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "doctors" }
);

const doctor = mongoose.model(`doctors`, doctorSchema);

module.exports = doctor;
