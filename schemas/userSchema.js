// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);

// user schema or structure
const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: [true, `please provide valid username`],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, `please provide valid phoneNumber`],
    },
    phoneAuthenticated: Boolean,
    whatsAppNumber: String,
    beneficiary: {
      hasBeneficiary: {
        type: Boolean,
        required: true,
      },
      beneficiaryId: {
        type: mongoose.ObjectId,
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, `please provide valid password`],
    },

    // the array should reference userRoleId from userRole collection
    // userRole: {
    //   type: [String],
    //   required: true,
    //   unique: true
    // },

    userRole: {
      type: String,
      enum: ["patient", "admin", "doctor"],
    },
    created: {
      createdBy: { type: mongoose.ObjectId },
      dateCreated: { type: Date },
    },
    updated: {
      updatedBy: { type: mongoose.ObjectId },
      dateUpdated: { type: Date },
    },
    userFile: {
      type: String,
    },
  },
  { collection: "users" }
);

const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
