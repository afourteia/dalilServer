// importing mongoose for appointment schema and collection
const mongoose = require(`mongoose`);

// appointment schema or structure
const appointmentSchema = mongoose.Schema({
  // appointmentId: {
  //   type: String,
  // },
  appointmentId: mongoose.ObjectId,
  appointmentDate: Date,
  timeslot: String,
  appointmentStatus: {
    type: String,
  },
  patient: {
    userId: {
      type: mongoose.ObjectId,
      required: [true, `please provide valid userId`],
    },
    patientType: {
      type: String,
      required: [true, `please provide valid patientType`],
    },
    patientId: {
      type: mongoose.ObjectId,
      required: [true, `please provide valid patientId`],
    },
    patientName: {
      type: String,
      required: [true, `please provide valid patientName`],
    },
    patientRelationship: {
      type: String,
      required: [true, `please provide valid patientRelationship`],
    },
  },
  scheduleId: {
    type: mongoose.ObjectId,
    required: [true, `please provide valid schedule id`],
  },
  medicalCenterId: {
    type: mongoose.ObjectId,
    required: [true, `please provide valid medicalCenter id`],
  },
  doctorId: {
    type: mongoose.ObjectId,
    required: [true, `please provide valid doctor id`],
  },  
  notes: String,
  medicalCenterObject: Object,
  doctorObject: Object,
  scheduleObject: Object,
  userId: {
    type: mongoose.ObjectId,
    required: [true, `please provide valid userId`],
  },
  created: {
    createdBy: { type: mongoose.ObjectId},
    dateCreated: { type: Date},
  },
  updated: {
    updatedBy: { type: mongoose.ObjectId},
    dateUpdated: { type: Date},
  }
}, { collection: 'appointments' });

const appointment = mongoose.model(`appointments`, appointmentSchema);

// exporting appointment collection
module.exports = appointment;
