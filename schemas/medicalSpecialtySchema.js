const mongoose = require(`mongoose`);

const medicalSpecialtySchema = mongoose.Schema({
  specialtyName: {
    type: String,
    required: [true, `please provide valid specialty name`],
  },
  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }
}, { collection: 'medicalSpecialties' });

const specialtyName = mongoose.model(`medicalSpecialties`, medicalSpecialtySchema);

module.exports = specialtyName;
