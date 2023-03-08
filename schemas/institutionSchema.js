// importing mongoose for institution schema and collection
const mongoose = require(`mongoose`);

const benefitTableSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
})

const benefitCatSchema = mongoose.Schema({
  aggregateLimit: {
    type: Number,
    required: true
  },
  informationTable: {
    type: [benefitTableSchema],
    required: true
  }

})

// benefit policy schema
const benefitPolicySchema = mongoose.Schema({
  benefitPolicyId: {
    type: String,
    unique: true,
    required: true
  },
  balanceResetDate:{
    month: {type: String, required: true},
    year: {type: String, required: true}
  },
  insuranceBudget: Number,
  inPatientBenefitCat: {
    type: benefitCatSchema,
    required: true
  },
  outPatientBenefitCat:{
    type: benefitCatSchema,
    required: true
  }

})

// institution schema or structure
const institutionSchema = mongoose.Schema({
  // institutionId: {
  //   type: String,
  // },
  institutionId: {type: String, unique: true},
  name: {type: String, required: [true, `please provide name`], unique: true},
  cityHQ: {type: String, required: [true, `please provide cityHQ`]},
  employeeCount:  {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  },
  beneficiaryCount:  {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i'
  },
  // created: {
  //   createdBy: { type: String, required: true},
  //   dateCreated: { type: Date, required: true},
  // },
  // updated: {
  //   updatedBy: { type: mongoose.ObjectId},
  //   dateUpdated: { type: Date},
  // }
}, { collection: 'institutions' });

const institution = mongoose.model(`institutions`, institutionSchema);

// exporting institution collection
module.exports = institution;
