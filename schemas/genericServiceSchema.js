// importing mongoose for genericService schema and collection
const mongoose = require(`mongoose`);


// genericService schema or structure
const genericServiceSchema = mongoose.Schema({

  genericServiceId: {type: String, unique: true},
  name: {type: String, required: [true, `please provide name`], unique: true},
  
  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
    required: true
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }
}, { collection: 'genericServices' });

const genericService = mongoose.model(`genericServices`, genericServiceSchema);

// exporting genericService collection
module.exports = genericService;
