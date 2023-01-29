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

claimsExample = [
  {
    claimId: "373-lpa-36",
    claimType: "direct",
    medicalCenterName: "Baum",
    patientName: "Emmery Baum",
    serviceType: "X-ray",
    ClaimAmount: "4840.06",
    ClaimCurrency: "LYD",
    ServiceDate: "2022-07-09",
    status: "pending",
    notes:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
  },
  {
    claimId: "126-iuj-75",
    claimType: "direct",
    medicalCenterName: "Rappa",
    patientName: "Zarla Rappa",
    serviceType: "laboratory",
    ClaimAmount: "4634.19",
    ClaimCurrency: "USD",
    ServiceDate: "2022-09-27",
    status: "accepted",
    notes:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  },
  {
    claimId: "828-sgq-36",
    claimType: "direct",
    medicalCenterName: "Tease",
    patientName: "Ham Tease",
    serviceType: "Alternative Medicine",
    ClaimAmount: "2078.69",
    ClaimCurrency: "EUR",
    ServiceDate: "2021-10-24",
    status: "rejected",
    notes:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  },
  {
    claimId: "090-dfg-54",
    claimType: "direct",
    medicalCenterName: "Blanket",
    patientName: "Enrichetta Blanket",
    serviceType: "Chronic Conditions",
    ClaimAmount: "0918.24",
    ClaimCurrency: "TRK",
    ServiceDate: "2021-11-21",
    status: "pending",
    notes:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
  {
    claimId: "925-dob-83",
    claimType: "direct",
    medicalCenterName: "Broz",
    patientName: "Gram Broz",
    serviceType: "Edoscopy",
    ClaimAmount: "7116.32",
    ClaimCurrency: "EUR",
    ServiceDate: "2022-03-06",
    status: "accepted",
    notes:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    claimId: "398-ciq-60",
    claimType: "direct",
    medicalCenterName: "Behrens",
    patientName: "Jeanie Behrens",
    serviceType: "optometric services",
    ClaimAmount: "810.87",
    ClaimCurrency: "USD",
    ServiceDate: "2021-12-15",
    status: "rejected",
    notes:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
  },
  {
    claimId: "654-zhd-22",
    claimType: "direct",
    medicalCenterName: "Isenor",
    patientName: "Katalin Isenor",
    serviceType: "optometric services",
    ClaimAmount: "7741.95",
    ClaimCurrency: "USD",
    ServiceDate: "2022-09-01",
    status: "pending",
    notes:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  },
  {
    claimId: "697-ukg-27",
    claimType: "direct",
    medicalCenterName: "Kobus",
    patientName: "Josiah Kobus",
    serviceType: "Room and Board",
    ClaimAmount: "3005.37",
    ClaimCurrency: "EUR",
    ServiceDate: "2022-08-26",
    status: "accepted",
    notes:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
  },
  {
    claimId: "628-rqo-01",
    claimType: "direct",
    medicalCenterName: "Lickorish",
    patientName: "Bob Lickorish",
    serviceType: "Emergency Room",
    ClaimAmount: "1735.03",
    ClaimCurrency: "EUR",
    ServiceDate: "2021-09-27",
    status: "rejected",
    notes:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
  },
  {
    claimId: "224-aan-46",
    claimType: "direct",
    medicalCenterName: "Leipnik",
    patientName: "Verena Leipnik",
    serviceType: "Chronic Conditions",
    ClaimAmount: "7828.81",
    ClaimCurrency: "LYD",
    ServiceDate: "2021-12-31",
    status: "pending",
    notes:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
];

// api for getting a single Beneficiary
const benefitPolicies = async (req, res) => {
  try {
    const inPatientServicesList = [];

    let i = 2 + Math.floor(Math.random() * 12);
    for (let index = 0; index < i; index++) {
      serviceDetails = {
        service: servicesList[index],
        limit: Number.parseFloat(Math.random() * 500).toFixed(2),
      };
      inPatientServicesList.push(serviceDetails);
    }
    i = 2 + Math.floor(Math.random() * 12);
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

const getClaims = async (req, res) => {
  try {


    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: {
        objectCount: claimsExample.length,
        hasMore: false,
        objectArray: claimsExample,
      },
    };

    res.status(200).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const createClaim = async (req, res) => {
    try {
  
  
      const responseBody = {
        codeStatus: "200",
        message: "good",
        data: {
          objectCount: claimsExample.length,
          hasMore: false,
          objectArray: claimsExample,
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
  getClaims,
  createClaim,
};
