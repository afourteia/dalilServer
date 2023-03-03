const AppointmentServices = require("../services/appointmentServices");
const uriDecoder = require('../utilities/URIdecoder');
const paginate = require('../utilities/pagination.utility');
const { successResponse, serverErrorResponse } = require("../utilities/response");
const { count } = require("../services/documentCounter.service");
const AppointmentSchema = require("../schemas/appointmentSchema");

const CreateAppointment = async (req, res) => {
  try {
    const document = await AppointmentServices.createAppointment({
      ...req.body,
      userId: req.params.userId,
      appointmentStatus: `pending`,
      dateCreated: Date(),
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
    let query = {};
    let sortObj = {};
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;

    // Filters from query
    let { appointmentStatus, date, price, timeSlot, sortBy } = req.query;

    if(appointmentStatus) {
      query.appointmentStatus = uriDecoder(appointmentStatus, 'multi-select');
    }

    if(date) {
      query.appointmentDate = uriDecoder(date, 'date-range');
    }

    if(price) {
      query.price = uriDecoder(price, 'number-range');
    }

    if(timeSlot) {
      query.timeslot = uriDecoder(timeSlot, 'multi-select');
    }

    // Sort fields
    if(sortBy) {
      sortObj = uriDecoder(sortBy, 'sort');
    }

    // Server side pagination
    let pagination = paginate(limit, page);

    let documents = await AppointmentServices.getAllAppointments(query, sortObj, pagination);
    let docCount = await count(AppointmentSchema);

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
    }
    return successResponse(res, message, documents, docCount);
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, error.message);
  }
};

module.exports = {
  CreateAppointment,
  UpdateAppointment,
  AllAppointments,
};
