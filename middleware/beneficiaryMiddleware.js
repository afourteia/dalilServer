const beneficiaries = require(`../schemas/beneficiarySchema`);
// importing all dependencies
const user = require(`../schemas/userSchema`);
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const mongoose = require("mongoose");

// api for creating Beneficiary
const createBeneficiary = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const payload = jwt.decode(auth.split(` `)[1]);
    const beneficiaries = await beneficiaries.find().sort({ _id: -1 }).limit(1);
    console.log(beneficiaries, payload);
    if (beneficiaries.length === 0) {
      const actualUser = await user.find({ userId: payload.userId });
      const {
        beneficiary: { beneficiaryId: beneficiary },
        userId,
        sd,
      } = actualUser[0];
      const newBody = {
        ...req.body,
        account: { hasAccount: true, userId: userId },
        beneficiaryId: beneficiary + `-1`,
        sd: sd,
      };
      const document = await beneficiaries.create(newBody);
      delete document._doc.sd;

      // server response
      res.status(200).json(document._doc);
    } else {
      const lastbeneficiary = beneficiaries[0].beneficiaryId;
      const idNumber = Number(lastbeneficiary.split(`-`)[1]);
      const actualUser = await user.find({ userId: payload.userId });
      const {
        beneficiary: { beneficiaryId: beneficiary },
        userId,
        sd,
      } = actualUser[0];
      const newBody = {
        ...req.body,
        account: { hasAccount: true, userId: userId },
        beneficiaryId: beneficiary + `-${idNumber + 1}`,
        sd: sd,
      };
      const document = await beneficiaries.create(newBody);
      delete document._doc.sd;

      // server response
      res.status(200).json(document._doc);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting all user Beneficiaries
const getBeneficiaries = async (req, res) => {
  try {
    const limitQuery = req.query.limit;
    let beneficiaryIdQuery = req.query.starting_after_object;
    const insurancePolicyId = req.query.insurancePolicyId;

    const limit = Number(limitQuery);
    if (!beneficiaryIdQuery) {
      beneficiaryIdQuery = `SSD-0`;
    }
    // if (!beneficiaryIdQuery.startsWith(`SSD-`)) {
    //   return res.status(404).json({
    //     message: `beneficiary not found, check your starting_after_object input`,
    //   });
    // }

    let beneficiaryId = Number(beneficiaryIdQuery.split(`-`)[1]);
    const insurancePolicy = insurancePolicyId;

    if (limit > 100 || limit < 1) {
      limit = 30;
    }

    if (!insurancePolicy) {
      const totalBeneficiaries = await beneficiaries.find({
        sd: { $gt: beneficiaryId },
      });
      let object = await beneficiaries
        .find({
          sd: {
            $gt: beneficiaryId,
          },
        })
        .limit(!limit ? 30 : limit);
      if (object.length === 0) {
        return res.status(404).json({
          message: `beneficiary not found`,
        });
      }
      object.forEach((object) => {
        delete object._doc.sd;
      });

      res.status(200).json({
        object,
        objectCount: totalBeneficiaries.length,
        hasMore: object.length >= totalBeneficiaries.length ? false : true,
      });
    }

    // checking for isurancePolicy Query
    if (insurancePolicy) {
      const totalBeneficiaries = await beneficiaries.find({
        sd: { $gt: beneficiaryId },
        insurancePolicyId: insurancePolicy,
      });
      let object = await beneficiary
        .find({
          sd: {
            $gt: beneficiaryId,
          },
          insurancePolicyId: insurancePolicy,
        })
        .limit(!limit ? 30 : limit);
      if (object.length === 0) {
        return res.status(404).json({
          message: `beneficiary not found`,
        });
      }
      object.forEach((object) => {
        delete object._doc.sd;
      });

      res.status(200).json({
        object,
        objectCount: totalBeneficiaries.length,
        hasMore: object.length >= totalBeneficiaries.length ? false : true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for getting a single Beneficiary
const singleBeneficiary = async (req, res) => {
  try {
    const document = await beneficiaries.findOne(req.params).lean();
    
    if (!document) {
      return res.status(404).json({ message: `beneficiary not found` });
    }

    // if (res.locals.user.userId !== document.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized for this user` });
    // }

    document.birthdate = document.birthdate.toLocaleDateString("en-GB");
    
    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: document
    };

    res.status(200).json({... responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// api for updating a single Beneficiary
const updateBeneficiary = async (req, res) => {
  try {
    const doc = await beneficiaries.findOne(req.params).lean();
    if (!doc) {
      return res.status(404).json({ message: `beneficiary to update not found` });
    }
    // if (res.locals.user.userId !== doc.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized` });
    // }
    const document = await beneficiaries
      .findOneAndUpdate(
        { beneficiaryId: req.params.beneficiaryId, userId: doc.userId },
        req.body,
        { new: true }
      )
      .lean();

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

module.exports = {
  createBeneficiary,
  getBeneficiaries,
  singleBeneficiary,
  updateBeneficiary,
};
