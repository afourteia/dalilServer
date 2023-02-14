const Institute = require("../schemas/institutionSchema");

const createInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({ name: req.body.name });
    if (institute) {
      return res.status(400).json({ error: "Institue already exist" });
    }
    const document = await Institute.create({
      ...req.body,
      createdBy: res.locals.userId,
      updatedBy: res.locals.userId,
    });
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getInstitutions = async (req, res) => {
  try {
    const institutes = await Institute.find()
      .populate("employees")
      .populate("beneficiaries");
    if (institutes.length < 1) {
      return res.status(404).json({ error: "No Institue found" });
    }
    res.status(200).json({
      institutes,
      objectCount: institutes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInstitute, getInstitutions };
