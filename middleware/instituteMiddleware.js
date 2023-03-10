const Institute = require("../schemas/institutionSchema");
const mongoose = require(`mongoose`);
const createInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({ name: req.body.name });
    if (institute) {
      return res.status(400).json({ error: "institution already exist" });
    }
    const document = await Institute.create({
      ...req.body,
      institutionId: new mongoose.Types.ObjectId().toString(),
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
    if (institutes.length < 1) {
      return res.status(404).json({ error: "No institution found" });
    }
    res.status(200).json({
      objectCount: institutes.length,
      institutes,
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const institute = await Institute.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
    if (!institute) {
      return res.status(404).json({ error: "No institution found" });
    }
    res.status(200).json({
      institute,
      message: "Institute updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const institute = await Institute.findOneAndDelete({ _id: req.params.id });
    if (!institute) {
      return res.status(404).json({ error: "No institution found" });
    }
    res.status(200).json({
      institute,
      message: "Institute deleted!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInstitute,
  getInstitutions,
  updateInstitution,
  deleteInstitution,
};
