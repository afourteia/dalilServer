// importing mongooose for medicalCenterSchema and collection setup
const mongoose = require(`mongoose`);

// medicalCenter schema setup
const medicalCenterSchema = mongoose.Schema({
  medicalCenterId: { type: mongoose.ObjectId, unique: true },
  name: {
    type: String,
    required: [true, `please enter valid  name`],
  },
  city: {
    type: String,
    required: [true, `please enter valid city`],
  },
  district: {
    type: String,
    required: [true, `please enter valid district`],
  },
  description: String,
  address: {
    type: String,
    required: [true, `please enter valid address`],
  },
  phoneNumber: {
    type: Array,
    required: [true, `please enter valid phoneNumbers`],
  },
  email: {
    type: String,
    // unique: true,
  },
  facebookLink: String,
  googleMapLink: String,
  website: {
    type: String,
    // required: [true, `please enter valid website`],
  },
  creation: {
    createdBy: {type: String},
    dateCreated: {type: Date},
  },

  fieldNames: {type: Array},
  originalNames: {type: Array},
  isActive: {type: Boolean},
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'medicalCenters' });

const medicalCenter = mongoose.model(`medicalCenters`, medicalCenterSchema);

module.exports = medicalCenter;
