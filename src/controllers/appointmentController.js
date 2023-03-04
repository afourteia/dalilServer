const AppointmentServices = require("../services/appointmentServices");
const CreateAppointment = async (req, res) => {
  try {
    if (req.params.userId) {
      req.params.userId = mongoose.Types.ObjectId(req.params.userId);
    }

    if (req.body.doctorId) {
      req.body.doctorId = mongoose.Types.ObjectId(req.body.doctorId);
    }
    if (req.body.medicalCenterId) {
      req.body.medicalCenterId = mongoose.Types.ObjectId(
        req.body.medicalCenterId
      );
    }

    if (req.body.scheduleId) {
      req.body.scheduleId = mongoose.Types.ObjectId(req.body.scheduleId);
    }

    if (req.body.patient.patientId) {
      req.body.scheduleId = mongoose.Types.ObjectId(req.body.patientId);
    }

    const medicalCenterObject = await medicalCenter
      .findOne({ medicalCenterId: req.body.medicalCenterId })
      .lean();
    const doctorObject = await doctor
      .findOne({ doctorId: req.body.doctorId })
      .lean();
    const scheduleObject = await schedule
      .findOne({ scheduleId: req.body.scheduleId })
      .lean();

    const document = await AppointmentServices.createAppointment({
      ...req.body,
      userId: req.params.userId,
      appointmentStatus: `pending`,
      dateCreated: Date(),
      medicalCenterObject: medicalCenterObject,
      doctorObject: doctorObject,
      scheduleObject: scheduleObject,
    });

    let message = "good";
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: document,
    };

    return res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const UpdateAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.updateAppointment(
      {
        appointmentId: req.params.appointmentId,
        userId: req.userId,
      },
      {
        ...req.body,
      }
    );
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }

    return res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const AllAppointments = async (req, res) => {
  try {
    let limitQP = Number(req.query.limit) ?? 30;

    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }

    let documents = AppointmentServices.getAllAppointments({}, limitQP);
    let count = documents.length;

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        objectArray: documents,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateAppointment,
  UpdateAppointment,
  AllAppointments,
};
