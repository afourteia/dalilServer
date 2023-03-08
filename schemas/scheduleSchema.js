// importing mongoose for schedule schema and collection
const mongoose = require(`mongoose`);

// schedule schema or structure
const scheduleSchema = mongoose.Schema({
  scheduleId: {
    type: String,
    required: [true, `please provide valid  scheduleId`],
  },
  medicalCenterId: {
    type: String,
    required: [true, `please provide valid medicalCenter id`],
  },
  doctorId: {
    type: String,
    required: [true, `please provide valid doctor id`],
  },
  timeslot: {
    type: String,
    required: [true, `please provide valid timeslot`],
  },
  monday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  tuesday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  wednesday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  thursday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  friday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  saturday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },
  sunday: {
    type: Boolean,
    required: [true, `please provide valid date`],
  },

  price: {
    type: Number,
    required: [true, `please provide valid price`],
  },
  startDate: {
    type: String,
    required: [true, `please provide valid startDate`],
  },
  endDate: {
    type: String,
    required: [true, `please provide valid endDate`],
  },
  isActive: {
    type: Boolean,
  },
  created: {
    createdBy: { type: String},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: String},
    dateUpdated: { type: Date},
  }

}, { collection: 'schedules' });

const schedule = mongoose.model(`schedules`, scheduleSchema);

// exporting schedule collection
module.exports = schedule;
