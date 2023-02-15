//importing appointments collection
const { find } = require("../schemas/scheduleSchema");
const schedule = require(`../schemas/scheduleSchema`);
const mongoose = require(`mongoose`);
// importing dependencies

// api for creating schedule
const createSchedule = async (req, res) => {
  try {
    const userId = res.locals.user.userId;

    if(req.body.doctorId){
      console.log(req.body.doctorId)
      req.body.doctorId = mongoose.Types.ObjectId(req.body.doctorId);
      console.log(req.body.doctorId)
    }
    if(req.body.medicalCenterId){
      console.log(req.body.medicalCenterId)
      req.body.medicalCenterId = mongoose.Types.ObjectId(req.body.medicalCenterId);
      console.log(req.body.medicalCenterId)
    }

    const document = await schedule.create({
      ...req.body,
      scheduleId: new mongoose.Types.ObjectId(),
      appointmentId: new mongoose.Types.ObjectId(),
      creation: {
        createdBy: res.locals.user.userId,
        dateCreated: Date(),
      },
      isActive: true,
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

// api for updating schedule
const updateSchedule = async (req, res) => {
  try {
    const document = await schedule
      .findOneAndUpdate(
        req.params,
        {
          ...req.body,
          lastUpdateDate: Date(),
        },
        { new: true }
      )
      .lean();
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// get schedules for doctor MP-GAi9126
const allDoctorSchedule = async (req, res) => {
  try {
    const doctorIdQP = req.params.doctorId;

    let hasMore = true;
    let query = {};
    query['$and']=[];

    query["$and"].push({"doctorId": {$eq: doctorIdQP}});
    
    // let objectCount = 0;    
    // objectCount = await schedule.aggregate([
    //   {
    //     $lookup: {
    //       from: `medicalCenters`,
    //       localField: `medicalCenterId`,
    //       foreignField: `medicalCenterId`,
    //       as: `medicalCenterObject`,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: `doctors`,
    //       localField: `doctorId`,
    //       foreignField: `doctorId`,
    //       as: `doctorObject`,
    //     },
    //   },
    //   { $match: { 
    //     $and: query["$and"]
    //    }
    //   },
    //   // {
    //   //   $group: {
    //   //     _id: '$age',
    //   //     count: { $sum: 1 }
    //   //   }
    //   // }
    //   {
    //     $sort: sortByQP_
    //   },
    //   {
    //     $count: "objectCount"
    //   }
    // ]);

    documents = await schedule.aggregate([
      {
        $lookup: {
          from: `medicalCenters`,
          localField: `medicalCenterId`,
          foreignField: `medicalCenterId`,
          as: `medicalCenterObject`,
        },
      },
      {
        $lookup: {
          from: `doctors`,
          localField: `doctorId`,
          foreignField: `doctorId`,
          as: `doctorObject`,
        },
      },
      { $match: { 
        $and: query["$and"]
        }
      },
      { $group:
        {
          _id: "$medicalCenterId",
          medicalCenterId: {$first: "$medicalCenterId"},
          medicalCenterName: {$first: "$medicalCenterObject.name"},
          scheduleList: { $push: "$$ROOT"}
        }
      }
    ]);


    documents.forEach((document) => {
      document.medicalCenterName = document.medicalCenterName[0];
      // document.medicalCenterId = document.medicalCenterId[0];
      document.scheduleList.forEach((document) => {
        document.medicalCenterObject = document.medicalCenterObject[0]
        document.doctorObject = document.doctorObject[0]
      })
    });
    let count = documents.length

    let message = "good"
    if (documents.length === 0){
      message = "list is empty change your query";
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        objectArray: documents
      }
    };

    res.status(200).json({...responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const specificSchedule = async (req, res) => {
  try {
    const document = await schedule.findOne(req.params).lean();
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json(document);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// getting all schedules
const allSchedule = async (req, res) => {
  try {
    const cityQP = req.query.city;
    const fromDateQP = req.query.fromDate;
    const toDateQP = req.query.toDate;
    const doctorIdQP = req.query.doctorId;
    const medicalCenterIdQP = req.query.medicalCenterId;
    const sortByQP = req.query.sortBy;
    const specialtyQP = req.query.specialty;
    const starting_after_objectQP = req.query.starting_after_object;
    const timeslotQP = req.query.timeSlot;
    const skipQP =  Number(req.query.skip ?? 0);

    let limitQP = req.query.limit;
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    }else{
      limitQP = 30;
    }

    let hasMore = true;
    let query = {};
    query['$and']=[];

    // These query parameters are optional, so we need to handle the situation where they are not provided
    if(doctorIdQP){
      // console.log(doctorIdQP);
      query["$and"].push({"doctorId": {$eq: mongoose.Types.ObjectId(doctorIdQP)}});
    }

    if(medicalCenterIdQP){
      // console.log(medicalCenterIdQP);
      query["$and"].push({"medicalCenterId": {$eq: mongoose.Types.ObjectId(medicalCenterIdQP)}});
    }

    if(cityQP){
      // console.log(cityQP);
      query["$and"].push({"medicalCenterObject.city": {$eq: cityQP}});
    }

    if(timeslotQP){
      // console.log(timeslotQP);
      query["$and"].push({timeslot: {$eq: timeslotQP}});
    }

    if(specialtyQP){
      // console.log(specialtyQP);
      query["$and"].push({"doctorObject.specialty": {$eq: specialtyQP}});
    }

    if(toDateQP){
      // console.log(toDateQP);
      query["$and"].push({startDate: {$lte: toDateQP}});      
    }

    if(fromDateQP){
      // console.log(fromDateQP);
      query["$and"].push({endDate: {$gte: fromDateQP}});      
    }

    // Sort by scheduleId by default. If specified, then either sort by doctorId or medicalCenterId
    let sortByQP_ = {}
    if(sortByQP === "doctor"){
      // console.log(sortByQP);
      sortByQP_ = {"doctorId": 1, "scheduleId": 1};

      if (starting_after_objectQP){
        query["$and"].push({"doctorId": {$gt: mongoose.Types.ObjectId(starting_after_objectQP) }});
      }
    }else if(sortByQP === "medicalCenter"){
      // console.log(sortByQP);
      sortByQP_ = {"medicalCenterId": 1, "scheduleId": 1};
      if (starting_after_objectQP){
        query["$and"].push({"medicalCenterId": {$gt: mongoose.Types.ObjectId(starting_after_objectQP)}});
      }
    }else{
      sortByQP_ = {"scheduleId": 1};
      if (starting_after_objectQP){
        query["$and"].push({"scheduleId": {$gt: mongoose.Types.ObjectId(starting_after_objectQP)}});
      }
    }
    
    let objectCount = 0;
    let count = 0

    // Error will be thrown if you pass an empty query to the $match filter
    if (query["$and"].length === 0) { 
      // documents = await schedule.find({},
      //   // { scheduleId: 1, "doctor.doctorId": 1,"medicalcenter.medicalCenterId": 1, _id: 1 } 
      //   ).sort( sortByQP_ ).limit(limitQP).lean();
      documents = await schedule.aggregate([
        {
          $lookup: {
            from: `medicalCenters`,
            localField: `medicalCenterId`,
            foreignField: `medicalCenterId`,
            as: `medicalCenterObject`,
          },
        },
        {
          $lookup: {
            from: `doctors`,
            localField: `doctorId`,
            foreignField: `doctorId`,
            as: `doctorObject`,
          },
        },
        {
          $sort: sortByQP_
        },
        { $skip : skipQP },
        {
          $limit: limitQP
        }
      ]);        
        

      objectCount = await schedule.find({},
        // { scheduleId: 1, "doctor.doctorId": 1,"medicalcenter.medicalCenterId": 1, _id: 1 } 
        ).countDocuments();

      count = objectCount;
        
    }else {
      // documents = await schedule.find(query,
      //   // { scheduleId: 1, "doctor.doctorId": 1,"medicalcenter.medicalCenterId": 1, _id: 1 } 
      //   ).sort( sortByQP_ ).limit(limitQP).lean();

      // documents = await schedule.find({},
        // { scheduleId: 1, "doctor.doctorId": 1,"medicalcenter.medicalCenterId": 1, _id: 1 } 
        // ).sort( sortByQP_ ).limit(limitQP).lean();
        
        documents = await schedule.aggregate([
          {
            $lookup: {
              from: `medicalCenters`,
              localField: `medicalCenterId`,
              foreignField: `medicalCenterId`,
              as: `medicalCenterObject`,
            },
          },
          {
            $lookup: {
              from: `doctors`,
              localField: `doctorId`,
              foreignField: `doctorId`,
              as: `doctorObject`,
            },
          },
          { $match: { 
            $and: query["$and"]
           }
          },
          {
            $sort: sortByQP_
          },
          { $skip : skipQP },
          {
            $limit: limitQP
          }
        ]);        

        // console.log(documents[0])
        for (const key in sortByQP_) {
          sortByQP_[key] = sortByQP_[key] *-1;
          // console.log(`obj.${key} = ${sortByQP_[key]}`);
        }

        lastDocument = await schedule.aggregate([
          {
            $lookup: {
              from: `medicalCenters`,
              localField: `medicalCenterId`,
              foreignField: `medicalCenterId`,
              as: `medicalCenterObject`,
            },
          },
          {
            $lookup: {
              from: `doctors`,
              localField: `doctorId`,
              foreignField: `doctorId`,
              as: `doctorObject`,
            },
          },
          { $match: { 
            $and: query["$and"]
           }
          },
          // {
          //   $group: {
          //     _id: '$age',
          //     count: { $sum: 1 }
          //   }
          // }
          {
            $sort: sortByQP_
          },
          {
            $limit: limitQP
          }
        ]);

        // console.log("lastDocument[0]")
        // console.log(lastDocument[0])
        documents.forEach((document) => {
          if (document.scheduleId.equals(lastDocument[0].scheduleId)) hasMore = false;
          document.doctorObject = document.doctorObject[0]
          document.medicalCenterObject = document.medicalCenterObject[0]
        });

        if (starting_after_objectQP){
          query["$and"].pop();
        }
        objectCount = await schedule.aggregate([
          {
            $lookup: {
              from: `medicalCenters`,
              localField: `medicalCenterId`,
              foreignField: `medicalCenterId`,
              as: `medicalCenterObject`,
            },
          },
          {
            $lookup: {
              from: `doctors`,
              localField: `doctorId`,
              foreignField: `doctorId`,
              as: `doctorObject`,
            },
          },
          { $match: { 
            $and: query["$and"]
           }
          },
          // {
          //   $group: {
          //     _id: '$age',
          //     count: { $sum: 1 }
          //   }
          // }
          {
            $sort: sortByQP_
          },
          {
            $count: "objectCount"
          }
        ]);
    }
    
    // console.log(objectCount[0].objectCount)
    if(objectCount[0] !== undefined){
      count = objectCount[0].objectCount
    }

    let message = "good"
    if (documents.length === 0){
      message = "list is empty change your query";
      hasMore = false;
    }
    const responseBody = {
      codeStatus: "200",
      message: message,
      data: {
        objectCount: count,
        hasMore,
        objectArray: documents
      }
    };

    res.status(200).json({...responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// deleting schedule
const deleteSchedule = async (req, res) => {
  try {
    const document = await schedule.findOneAndDelete(req.params).lean();
    if (!document) {
      return res.status(404).json({ message: `schedule not found` });
    }
    res.status(200).json({ message: `successfully deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSchedule,
  updateSchedule,
  allDoctorSchedule,
  specificSchedule,
  allSchedule,
  deleteSchedule,
};
