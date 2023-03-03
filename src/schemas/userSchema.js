// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, `please provide valid username`],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, `please provide valid phoneNumber`],
    },
    phoneAuthenticated: { type: Boolean, default: false },
    whatsAppNumber: { type: String },
    beneficiary: {
      hasBeneficiary: {
        type: Boolean,
      },
      beneficiaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // unique: true,
      },
    },
    password: {
      type: String,
      required: [true, `please provide valid password`],
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctors",
      default: null,
    },
    institution_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institutions",
      default: null,
    },
    // the array should reference userRoleId from userRole collection
    userRole: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "userRoles",
    },

    level: {
      type: String,
      // required: [true, `please enter valid level`],
    },
    gender: {
      type: String,
      // required: [true, `please enter valid gender`],
    },
    birthdate: {
      type: String,
      // required: [true, `please enter valid birthdate`],
    },
    middleName: {
      type: String,
      // required: [true, `please enter valid middle name`],
    },
    lastName: {
      type: String,
      // required: [true, `please enter valid last name`],
    },
    specialty: {
      type: String,
      // required: [true, `please enter valid specialty`],
    },

    // userRole: {
    //   type: String,
    //   enum: ["patient", "admin", "doctor", "staff"],
    // },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

    userFile: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
