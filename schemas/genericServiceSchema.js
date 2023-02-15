// importing mongoose for genericService schema and collection
const mongoose = require(`mongoose`);


// genericService schema or structure
const genericServiceSchema = mongoose.Schema({

  genericServiceId: {type: mongoose.ObjectId, unique: true},
  name: {type: String, required: [true, `please provide name`], unique: true},
  
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
    required: true
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'genericServices' });

const genericService = mongoose.model(`genericServices`, genericServiceSchema);

// exporting genericService collection
module.exports = genericService;
