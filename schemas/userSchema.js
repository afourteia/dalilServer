// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);

// user schema or structure
const userSchema = mongoose.Schema({  
  userId: {
    type: mongoose.ObjectId,
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
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'users' });

const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
