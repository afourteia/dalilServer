servicesList = [
  "yearly physicals",
  "cosmetic surgery",
  "prescription drugs",
  "optometric services",
  "laboratory",
  "X-ray",
  "Room and Board",
  "Chronic Conditions",
  "Transportation",
  "Emergency Room",
  "Therapy",
  "Edoscopy",
  "Alternative Medicine",
  "Radiology",
  "Consultation",
  "TeleMedicine",
];

// api for getting a single Beneficiary
const benefitPolicies = async (req, res) => {
  try {
    const inPatientServicesList = [];

    let i = 2 +  Math.floor(Math.random() * 12);
    for (let index = 0; index < i; index++) {
      serviceDetails = {
        service: servicesList[index],
        limit: Number.parseFloat(Math.random() * 500).toFixed(2),
      };
      inPatientServicesList.push(serviceDetails);
    }
    i = 2 +  Math.floor(Math.random() * 12);
    const outPatientServicesList = [];

    for (let index = 0; index < i; index++) {
      serviceDetails = {
        service: servicesList[index],
        limit: Number.parseFloat(Math.random() * 500).toFixed(2),
      };
      outPatientServicesList.push(serviceDetails);
    }

    benefitPolicy = {
      insurancePolicyId: "DFSD-3432Jds",
      insuranceType: "Employee",
      insuranceIssuer: "Naseem Medical Company",
      balanceResetDate: "10-01",
      policyExpirationDate: "2023-01-22",
      inPatientAggregateLimit: Number.parseFloat(
        500 + Math.random() * 2000
      ).toFixed(2),
      inPatientServices: inPatientServicesList,
      outPatientAggregateLimit: Number.parseFloat(
        500 + Math.random() * 2000
      ).toFixed(2),
      outPatientServices: outPatientServicesList,
    };

    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: {
        objectCount: 0,
        hasMore: false,
        objectArray: benefitPolicy,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  benefitPolicies,
};
