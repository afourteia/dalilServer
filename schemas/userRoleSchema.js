// importing mongoose for userRole schema and collection
const mongoose = require(`mongoose`);


// userRole schema or structure
const userRoleSchema = mongoose.Schema({

  userRoleId: {type: String, unique: true},
  name: {type: String, required: [true, `please provide name`], unique: true},
  
  // list the api endpoint this role should have access to
  apiPrivilages: {
    type: [String],
    required: true,
    unique: true,
  },
  
  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
    required: true
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }
}, { collection: 'userRoles' });

const userRole = mongoose.model(`userRoles`, userRoleSchema);

// exporting userRole collection
module.exports = userRole;
