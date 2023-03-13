const response = {
  statusCode: 200,
  message: "good",
  data: [],
};

const appointmentStatusEnum = async (req, res) => {
  try {
    const document = [
      "pending",
      "booked",
      "cancelled",
      "rejected",
      "completed",
    ];
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const timeslotEnum = async (req, res) => {
  try {
    const document = ["morning", "afternoon", "evening"];
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const relationshipToBeneficiaryEnum = async (req, res) => {
  try {
    const document = [
      "self",
      "father",
      "mother",
      "wife",
      "husband",
      "daughter",
      "son",
    ];
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const genderEnum = async (req, res) => {
  try {
    const document = ["male", "female"];
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const accountStatusEnum = async (req, res) => {
    try {
      const document = ["active", "disabled"];
      response.data = document;
      res.status(200).json({...response});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };


module.exports = { appointmentStatusEnum,timeslotEnum, accountStatusEnum,relationshipToBeneficiaryEnum, genderEnum };