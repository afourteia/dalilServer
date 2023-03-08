const mongoose = require(`mongoose`);

const cityNameSchema = mongoose.Schema({
  cityName: {
    type: String,
    required: [true, `please provide valid city name`],
  },
  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }
}, { collection: 'cities' });

const cityName = mongoose.model(`cities`, cityNameSchema);

module.exports = cityName;
