const AppointmentServices = require("../services/appointmentServices");
const SmsServices = require("../services/smsServices");
const createAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.createAppointment({
      ...req.body,
      // userId: req.params.userId,
      appointmentStatus: `pending`,
      dateCreated: Date(),
    });
    const findDocument = await AppointmentServices.getAppointmentDetails({
      _id: document._id,
    });

    let message_body = `Your appointment for ${findDocument.doctorId?.firstName} at ${findDocument.medicalCenterId?.name} on ${findDocument.appointmentDate} is ${findDocument.appointmentStatus}`;
    const sms = await SmsServices.createSms({
      phone: findDocument.userId?.phoneNumber,
      message: message_body,
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

const updateAppointment = async (req, res) => {
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

const getAppointments = async (req, res) => {
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

    let documents = AppointmentServices.getAppointments({}, limitQP);
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

const getAppointment = async (req, res) => {};
const deleteAppointment = async (req, res) => {};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
  getAppointments,
};
