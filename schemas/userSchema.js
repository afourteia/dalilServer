// importing mongoose dependency for user schema and model creation
const mongoose = require(`mongoose`);

// user schema or structure
const userSchema = mongoose.Schema({  
  userId: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: [true, `please provide valid username`],
    unique: true,
  },
  firstName: String,
  middleName: String,
  lastName: String,
  phoneNumber: {
    type: String,
    required: [true, `please provide valid phoneNumber`],
  },
  phoneAuthenticated: Boolean,
  whatsAppNumber: String,
  email: String,
  beneficiaryId: {
    type: String,
    index: { unique: true, sparse: true }
  },
  password: {
    type: String,
    required: [true, `please provide valid password`],
  },

  // the array should reference userRoleId from userRole collection
  // userRole: {
  //   type: [String],
  //   // required: true,
  //   unique: true
  // },
  // created: {
  //   createdBy: { type: String},
  //   dateCreated: { type: Date},
  // },
  // updated: {
  //   updatedBy: { type: String},
  //   dateUpdated: { type: Date},
  // }
}, { collection: 'users' });

const user = mongoose.model(`users`, userSchema);

/// exporting user model to usermiddleware for querying user collection
module.exports = user;
