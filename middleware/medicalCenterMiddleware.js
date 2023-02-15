// importing medicalCenter collection for querying database
const medicalCenter = require(`../schemas/medicalCenterSchema`);
const mongoose = require(`mongoose`);
// api/ logic for medicalCenter creation
const createmedicalCenter = async (req, res) => {
  try {   
    
    // console.log("req.is('application/json')")
    // console.log(req.is('application/json'))
    // console.log("req.is('multipart/form-data')")
    // console.log(req.is('multipart/form-data'))

    // console.log("req.body")
    // console.log(req.body)
    
    // support two types of content-type
    if(!req.is('application/json') & !req.is('multipart/form-data')){
      return res.status(400).json({ message: "content-type needs to be either application/json or multipart/form-data" });
    }

    const fieldNamesList = []
    const originalNamesList = []

    const objectName = req.files;
    const isObjectEmpty = (objectName) => {
      return (
        objectName &&
        Object.keys(objectName).length === 0 &&
        objectName.constructor === Object
      );
    };

    // console.log("files in req");
    // console.log("files" in req);
    // check if files are submitted
    if("files" in req){
      req.files.forEach(file => {
        fieldNamesList.push(file.fieldname)
        originalNamesList.push(file.originalname)
      })  
    }
    // console.log("___________________________________________")
    // console.log("fieldNamesList")
    // console.log(fieldNamesList)
    // console.log("originalNamesList")
    // console.log(originalNamesList)
    // console.log("___________________________________________")
    
    const document = await medicalCenter.create({      
      ...req.body,
      medicalCenterId: new mongoose.Types.ObjectId(),
      creation:{
        createdBy: res.locals.user.userId,
        dateCreated: Date(),
      },
      isActive: true,
      fieldNames: fieldNamesList,
      originalNames: originalNamesList
    });
    const responseBody = {
      codeStatus: "201",
      message: "document created",
      data: document
    };
    return res.status(201).json({ ...responseBody });

  } catch (error) {
    //   checking for server errors
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// api/ logic for getting a medicalCenter
const singlemedicalCenter = async (req, res) => {
  try {
    const document = await medicalCenter.find(req.params).lean();
    if (document.length === 0) {
      return res.status(404).json({ message: `document not found` });
    }

    res.status(200).json(document);
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

// api/ logic for updating a medicalCenter
const updatemedicalCenter = async (req, res) => {
  try {
    if(req.params.medicalCenterId){
      console.log(req.params.medicalCenterId)
      req.params.medicalCenterId = mongoose.Types.ObjectId(req.params.medicalCenterId);
      console.log(req.params.medicalCenterId)
    }

    const document = await medicalCenter
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
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

// api/ logic for updating a medicalCenter
const deletemedicalCenter = async (req, res) => {
  try {
    const document = await medicalCenter.findOneAndDelete(req.params);
    if (!document) {
      return res.status(404).json({ message: `document not found` });
    }
    res.status(200).json({ message: `successfully Deleted` });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

// api/ logic for getting all medicalCenter
const allmedicalCenter = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    if (limitQP) {
      limitQP = Number(limitQP);
      if (limitQP > 100 || limitQP < 1) {
        limitQP = 30;
      }
    }else{
      limitQP = 30;
    }

    const starting_after_objectQP = req.query.starting_after_object;
    const starting_before_objectQP = req.query.starting_before_object;
    const skipQP =  Number(req.query.skip ?? 0);
    console.log(req.query.skip) 
    console.log(skipQP) 
    const cityQP = req.query.city;
    const searchQueryQP = req.query.searchQuery;
    let hasMore = true;
    let query = {};
    query['$and']=[];

    if(cityQP){
      // console.log(cityQP);
      query["$and"].push({"city": {$eq: cityQP}});
    }

    if(searchQueryQP){
      console.log("searchQueryQP");
      console.log(searchQueryQP);      
      query["$and"].push({"name" : {
        $regex : searchQueryQP,
        "$options": "i"
      }});      
    }
    
    
    sortByQP_ = {"medicalCenterId": 1};
    if (starting_after_objectQP){
      query["$and"].push({"medicalCenterId": {$gt: mongoose.Types.ObjectId(starting_after_objectQP)}});
      // query["$and"].push({"medicalCenterId": {$gt: mongoose.Types.ObjectId(starting_after_objectQP)}});
    }
    if (starting_before_objectQP){
      query["$and"].push({"medicalCenterId": {$lt: mongoose.Types.ObjectId(starting_before_objectQP)}});
    }
    console.log("query['$and']")
    console.log(query["$and"])
    let count = 0
    if (query["$and"].length === 0) { 
      documents = await medicalCenter.find({},
        ).sort( sortByQP_ ).skip(skipQP).limit(limitQP).lean();
        

      objectCount = await medicalCenter.find({},
        ).countDocuments();
      count = objectCount;
        
    }else {

      documents = await medicalCenter.aggregate([
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
      
      for (const key in sortByQP_) {
        sortByQP_[key] = sortByQP_[key] *-1;
        // console.log(`obj.${key} = ${sortByQP_[key]}`);
      }

      lastDocument = await medicalCenter.aggregate([
        { $match: { 
          $and: query["$and"]
         }
        },
        {
          $sort: sortByQP_
        },
        {
          $limit: limitQP
        }
      ]);
      
      if (starting_before_objectQP){
        query["$and"].pop();
      }
      if (starting_after_objectQP){
        query["$and"].pop();
      }
      if (query["$and"].length === 0) { 
        objectCount = await medicalCenter.aggregate([
          {
            $sort: sortByQP_
          },
          {
            $count: "objectCount"
          }
        ]);
      }else{
        objectCount = await medicalCenter.aggregate([
          { $match: { 
            $and: query["$and"]
           }
          },
          {
            $sort: sortByQP_
          },
          {
            $count: "objectCount"
          }
        ]);
      }
      



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
    //   checking for server errors
    console.log(error);
    res.status(200).json({ message: error.message });
  }
};

module.exports = {
  createmedicalCenter,
  singlemedicalCenter,
  updatemedicalCenter,
  deletemedicalCenter,
  allmedicalCenter,
};
