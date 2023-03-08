// importing doctor collection for querying database
const doctor = require(`../schemas/doctorSchema`);
const mongoose = require(`mongoose`);
// api/ logic for doctor creation
const createDoctor = async (req, res) => {
  try {
    // support two types of content-type
    if (!req.is("application/json") & !req.is("multipart/form-data")) {
      return res.status(400).json({
        message:
          "content-type needs to be either application/json or multipart/form-data",
      });
    }

    const fieldNamesList = [];
    const originalNamesList = [];

    // check if files are submitted
    if ("files" in req) {
      req.files.forEach((file) => {
        fieldNamesList.push(file.fieldname);
        originalNamesList.push(file.originalname);
      });
    }

    if(req.body.birthDate){
      console.log(req.body.birthDate)
      req.body.birthDate = new Date(req.body.birthDate)
      console.log(req.body.birthDate)
    }

    const document = await doctor.create({
      ...req.body,
      doctorId: new mongoose.Types.ObjectId().toString(),
      creation: {
        createdBy: res.locals.user.userId,
        dateCreated: Date(),
      },
      isActive: true,
      fieldNames: fieldNamesList,
      originalNames: originalNamesList,
    });

    const responseBody = {
      codeStatus: "201",
      message: "document created",
      data: document,
    };
    return res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting a single doctor
const singleDoctor = async (req, res) => {
  try {
    const document = await doctor.find(req.params).lean();
    if (document.length === 0) {
      return res.status(404).json({ message: `document not found` });
    }
    document.forEach((each) => {
      delete each.sd;
    });
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for updating a single doctor
const updateDoctor = async (req, res) => {
  try {

    if(req.params.doctorId){
      console.log(req.params.doctorId)
      req.params.doctorId = (req.params.doctorId);
      console.log(req.params.doctorId)
    }
    const document = await doctor
      .findOneAndUpdate(req.params, req.body, {
        new: true,
      })
      .lean();
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }
    const documentArray = [document];
    documentArray.forEach((each) => {
      delete each.sd;
    });
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for deleting a single doctor
const deleteDoctor = async (req, res) => {
  try {
    const document = await doctor.findOneAndDelete(req.params);
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }
    res.status(200).json({ message: `successfully Deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting all  doctors
const allDoctor = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    } else {
      limitQP = 30;
    }
    const limit = Number(limitQP);

    const starting_after_objectQP = req.query.starting_after_object;
    const specialtyQP = req.query.specialty;
    const searchQueryQP = req.query.searchQuery;
    const skipQP =  Number(req.query.skip ?? 0);

    let hasMore = true;
    let query = {};
    query["$and"] = [];
    query["$or"] = [];

    if (specialtyQP) {
      // console.log(specialtyQP);
      query["$and"].push({ "specialty": { $eq: specialtyQP } });
    }

    if (searchQueryQP) {
      // console.log("searchQueryQP");
      // console.log(searchQueryQP);
      query["$or"].push({
        firstName: {
          $regex: searchQueryQP,
          $options: "i",
        },
      });
      query["$or"].push({
        middleName: {
          $regex: searchQueryQP,
          $options: "i",
        },
      });
      query["$or"].push({
        lastName: {
          $regex: searchQueryQP,
          $options: "i",
        },
      });
      query["$and"].push({ $or: query["$or"] });
    }

    if (starting_after_objectQP) {
      query["$and"].push({
        doctorId: { $gt: (starting_after_objectQP) },
      });
    }

    let sortByQP_ = { doctorId: 1 };

    // console.log("query['$and']");
    // console.log(query["$and"]);

    let count = 0;

    if (query["$and"].length === 0) {
      documents = await doctor.find({}).sort(sortByQP_).skip(skipQP).limit(limitQP).lean();

      objectCount = await doctor.find({}).countDocuments();

      count = objectCount;
    } else {
      documents = await doctor.aggregate([
        {
          $match: {
            $and: query["$and"],
          },
        },
        {
          $sort: sortByQP_,
        },
        { $skip : skipQP },
        {
          $limit: limitQP,
        },
      ]);

      for (const key in sortByQP_) {
        sortByQP_[key] = sortByQP_[key] * -1;
        // console.log(`obj.${key} = ${sortByQP_[key]}`);
      }

      lastDocument = await doctor.aggregate([
        {
          $match: {
            $and: query["$and"],
          },
        },
        {
          $sort: sortByQP_,
        },
        {
          $limit: limitQP,
        },
      ]);

      if (starting_after_objectQP) {
        query["$and"].pop();
      }

      objectCount = await doctor.aggregate([
        {
          $match: {
            $and: query["$and"],
          },
        },
        {
          $sort: sortByQP_,
        },
        {
          $count: "objectCount",
        },
      ]);
    }

    
    // console.log(objectCount[0].objectCount)
    if (objectCount[0] !== undefined) {
      count = objectCount[0].objectCount;
    }

    let message = "good";
    if (documents.length === 0) {
      message = "list is empty change your query";
      hasMore = false;
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        hasMore,
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
  createDoctor,
  singleDoctor,
  updateDoctor,
  deleteDoctor,
  allDoctor,
};
