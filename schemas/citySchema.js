const mongoose = require(`mongoose`);

const cityNameSchema = mongoose.Schema({
  cityName: {
    type: String,
    required: [true, `please provide valid city name`],
  },
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'cities' });

const cityName = mongoose.model(`cities`, cityNameSchema);

module.exports = cityName;
