// importing medicalCenter collection for querying database
const medicalCenter = require(`../schemas/medicalCenterSchema`);
// api/ logic for medicalCenter creation
const createmedicalCenter = async (req, res) => {
  try {
    const allDocument = await medicalCenter.find({});
    if (allDocument.length === 0) {
      const document = await medicalCenter.create({
        ...req.body,
        medicalCenterId: `MC-1`,
        sd: 1,
      });
      delete document._doc.sd;
      res.status(200).json(document._doc);
    } else {
      const lastDocument = allDocument[allDocument.length - 1];
      const idNumber = Number(lastDocument.medicalCenterId.split(`-`)[1]);
      const document = await medicalCenter.create({
        ...req.body,
        medicalCenterId: `MC-${idNumber + 1}`,
        sd: idNumber + 1,
      });
      delete document._doc.sd;
      res.status(200).json(document._doc);
    }
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ msg: error.message });
  }
};

// api/ logic for getting a medicalCenter
const singlemedicalCenter = async (req, res) => {
  try {
    const document = await medicalCenter.find(req.params).lean();
    if (document.length === 0) {
      return res.status(404).json({ msg: `document not found` });
    }
    document.forEach((each) => {
      delete each.sd;
    });
    res.status(200).json(document);
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ msg: error.message });
  }
};

// api/ logic for updating a medicalCenter
const updatemedicalCenter = async (req, res) => {
  try {
    const document = await medicalCenter
      .findOneAndUpdate(req.params, req.body, {
        new: true,
      })
      .lean();
    if (!document) {
      return res.status(404).json({ msg: `document not found` });
    }
    const documentArray = [document];
    documentArray.forEach((each) => {
      delete each.sd;
    });
    res.status(200).json(document);
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ msg: error.message });
  }
};

// api/ logic for updating a medicalCenter
const deletemedicalCenter = async (req, res) => {
  try {
    const document = await medicalCenter.findOneAndDelete(req.params);
    if (!document) {
      return res.status(404).json({ msg: `document not found` });
    }
    res.status(200).json({ msg: `successfully Deleted` });
  } catch (error) {
    //   checking for server errors
    console.log(error);
    res.status(200).json({ msg: error.message });
  }
};

// api/ logic for getting all medicalCenter
const allmedicalCenter = async (req, res) => {
  try {
    let limitQP = req.query.limit;
    limitQP = Number(limitQP);
    if (limitQP > 100 || limitQP < 1) {
      limitQP = 30;
    }

    const starting_after_objectQP = req.query.starting_after_object;
    const cityQP = req.query.city;

    let hasMore = true;
    let query = {};
    query['$and']=[];

    if(cityQP){
      console.log(cityQP);
      query["$and"].push({"city": {$eq: cityQP}});
    }
    
    sortByQP_ = {"medicalCenterId": 1};
    if (starting_after_objectQP){
      query["$and"].push({"medicalCenterId": {$gt: starting_after_objectQP}});
    }

    if (query["$and"].length === 0) { 
      documents = await medicalCenter.find({},
        ).sort( sortByQP_ ).limit(limitQP).lean();
        

      objectCount = await medicalCenter.find({},
        ).countDocuments();
        
    }else {

      documents = await medicalCenter.aggregate([
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

      if (starting_after_objectQP){
        query["$and"].pop();
      }

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

    let count = 0
    // console.log(objectCount[0].objectCount)
    if(objectCount[0] !== undefined){
      count = objectCount[0].objectCount
    }

    let msg = "good"
    if (documents.length === 0){
      msg = "list is empty change your query";
      hasMore = false;
    }
    const responseBody = {
      codeStatus: "200",
      message: msg,
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
    res.status(200).json({ msg: error.message });
  }
};

module.exports = {
  createmedicalCenter,
  singlemedicalCenter,
  updatemedicalCenter,
  deletemedicalCenter,
  allmedicalCenter,
};
