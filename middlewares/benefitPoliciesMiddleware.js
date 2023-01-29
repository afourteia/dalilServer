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
    currency: "LYD",
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
    currency: "USD",
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
    currency: "EUR",
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
    currency: "TRK",
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
    currency: "EUR",
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
    currency: "USD",
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
    currency: "USD",
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
    currency: "EUR",
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
    currency: "EUR",
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
    currency: "LYD",
    ServiceDate: "2021-12-31",
    status: "pending",
    notes:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
  },
];

expenseReportsExample = [{
    "expenseReportId": "563-whq-91",
    "medicalCenterId": "1q0-bfw-39",
    "medicalCenterName": "Shorooq Salam Clinic",
    "beneficiaryId": "k87j81.95g",
    "patientId": "g6r60-asx-65",
    "patientName": "Clarisse Sones",
    "serviceType": "Consultation",
    "charge": "5628.17",
    "currency": "LYD",
    "serviceDate": "2022-08-03"
  },
  {
    "expenseReportId": "002-bow-64",
    "medicalCenterId": "0n6-xcd-44",
    "medicalCenterName": "Wikivu",
    "beneficiaryId": "y78a99.94u",
    "patientId": "l6z60-uek-38",
    "patientName": "Celestina Gaskill",
    "serviceType": "Therapy",
    "charge": "5192.88",
    "currency": "EUR",
    "serviceDate": "2021-11-03"
  },
  {
    "expenseReportId": "216-xqh-35",
    "medicalCenterId": "0s7-hjh-71",
    "medicalCenterName": "long name testsssss",
    "beneficiaryId": "f81f96.19e",
    "patientId": "d3x75-ede-97",
    "patientName": "Renado Gossart",
    "serviceType": "Room and Board",
    "charge": "4521.59",
    "currency": "LYD",
    "serviceDate": "2021-12-29"
  },
  {
    "expenseReportId": "253-vtf-03",
    "medicalCenterId": "9r9-elf-88",
    "medicalCenterName": "Brainverse",
    "beneficiaryId": "b26a12.94w",
    "patientId": "m2k81-kpr-27",
    "patientName": "Wolfie Dack",
    "serviceType": "Consultation",
    "charge": "2485.31",
    "currency": "LYD",
    "serviceDate": "2022-03-04"
  },
  {
    "expenseReportId": "865-hki-60",
    "medicalCenterId": "1j3-orl-06",
    "medicalCenterName": "Quire",
    "beneficiaryId": "q33c75.48s",
    "patientId": "x3t50-hiw-80",
    "patientName": "Zolly Lardge",
    "serviceType": "Emergency Room",
    "charge": "6173.23",
    "currency": "USD",
    "serviceDate": "2022-02-25"
  },
  {
    "expenseReportId": "641-dvy-97",
    "medicalCenterId": "4c6-dti-72",
    "medicalCenterName": "Yakijo",
    "beneficiaryId": "v99h56.37n",
    "patientId": "h5p33-sja-85",
    "patientName": "Chantal Dinesen",
    "serviceType": "Consultation",
    "charge": "5973.28",
    "currency": "USD",
    "serviceDate": "2022-06-14"
  },
  {
    "expenseReportId": "680-otg-07",
    "medicalCenterId": "3p6-wxn-77",
    "medicalCenterName": "Tagcat",
    "beneficiaryId": "u01e80.19v",
    "patientId": "y3m45-unt-99",
    "patientName": "Veronike Deeley",
    "serviceType": "TeleMedicine",
    "charge": "6903.22",
    "currency": "EUR",
    "serviceDate": "2022-03-17"
  },
  {
    "expenseReportId": "085-irm-31",
    "medicalCenterId": "3j3-jzf-72",
    "medicalCenterName": "Dynava",
    "beneficiaryId": "b89d25.84d",
    "patientId": "e8n70-phd-78",
    "patientName": "Ettore Ceillier",
    "serviceType": "prescription drugs",
    "charge": "0127.88",
    "currency": "EUR",
    "serviceDate": "2022-07-18"
  },
  {
    "expenseReportId": "129-iip-77",
    "medicalCenterId": "3s1-opf-31",
    "medicalCenterName": "Skaboo",
    "beneficiaryId": "h87o17.34o",
    "patientId": "a1j09-hiu-05",
    "patientName": "Klaus Benardeau",
    "serviceType": "Radiology",
    "charge": "5912.07",
    "currency": "LYD",
    "serviceDate": "2022-03-16"
  },
  {
    "expenseReportId": "134-gjl-78",
    "medicalCenterId": "7g8-qsc-22",
    "medicalCenterName": "Thoughtbridge",
    "beneficiaryId": "a74z09.62b",
    "patientId": "h0f19-hzq-16",
    "patientName": "Aristotle Van de Vlies",
    "serviceType": "cosmetic surgery",
    "charge": "5055.04",
    "currency": "EUR",
    "serviceDate": "2022-01-18"
  },
  {
    "expenseReportId": "027-bgh-47",
    "medicalCenterId": "8a8-wkq-12",
    "medicalCenterName": "Eamia",
    "beneficiaryId": "f94d27.01t",
    "patientId": "o9i34-vfr-84",
    "patientName": "Wilona Mussilli",
    "serviceType": "Therapy",
    "charge": "4416.80",
    "currency": "LYD",
    "serviceDate": "2022-10-02"
  },
  {
    "expenseReportId": "859-lbm-65",
    "medicalCenterId": "1n1-evs-54",
    "medicalCenterName": "Skipstorm",
    "beneficiaryId": "n78y29.61o",
    "patientId": "t5p57-xqb-29",
    "patientName": "Parrnell Baltzar",
    "serviceType": "Emergency Room",
    "charge": "4776.87",
    "currency": "TRK",
    "serviceDate": "2022-03-01"
  },
  {
    "expenseReportId": "401-dgy-44",
    "medicalCenterId": "7o5-vcr-63",
    "medicalCenterName": "Dynabox",
    "beneficiaryId": "e68h15.07a",
    "patientId": "v1x29-lvb-23",
    "patientName": "Birgitta Sperrett",
    "serviceType": "prescription drugs",
    "charge": "0558.33",
    "currency": "USD",
    "serviceDate": "2021-10-09"
  },
  {
    "expenseReportId": "060-ows-70",
    "medicalCenterId": "5e4-grp-71",
    "medicalCenterName": "Jaloo",
    "beneficiaryId": "p91r24.78c",
    "patientId": "u1g25-rvo-58",
    "patientName": "Suzann Camble",
    "serviceType": "Emergency Room",
    "charge": "5495.47",
    "currency": "EUR",
    "serviceDate": "2022-05-28"
  },
  {
    "expenseReportId": "913-cpy-27",
    "medicalCenterId": "6r1-wdm-99",
    "medicalCenterName": "Dynazzy",
    "beneficiaryId": "b17l96.17a",
    "patientId": "v1f01-ldd-86",
    "patientName": "Mitzi McColgan",
    "serviceType": "Consultation",
    "charge": "2424.48",
    "currency": "EUR",
    "serviceDate": "2022-02-09"
  },
  {
    "expenseReportId": "855-dom-18",
    "medicalCenterId": "2e0-qek-01",
    "medicalCenterName": "Buzzster",
    "beneficiaryId": "r04i32.96n",
    "patientId": "v1w02-ngm-09",
    "patientName": "Dur Bengtsen",
    "serviceType": "Consultation",
    "charge": "2561.29",
    "currency": "LYD",
    "serviceDate": "2022-04-25"
  },
  {
    "expenseReportId": "561-bzt-80",
    "medicalCenterId": "8j3-rmt-55",
    "medicalCenterName": "Fadeo",
    "beneficiaryId": "b45b19.38f",
    "patientId": "c0c64-jzj-03",
    "patientName": "Burch Cramond",
    "serviceType": "Chronic Conditions",
    "charge": "8836.82",
    "currency": "LYD",
    "serviceDate": "2022-01-30"
  },
  {
    "expenseReportId": "886-kkb-61",
    "medicalCenterId": "5s7-zkv-06",
    "medicalCenterName": "Myworks",
    "beneficiaryId": "t74w34.02h",
    "patientId": "w2p73-eim-41",
    "patientName": "Miltie McDermott-Row",
    "serviceType": "optometric services",
    "charge": "5454.06",
    "currency": "TRK",
    "serviceDate": "2021-10-12"
  },
  {
    "expenseReportId": "878-now-60",
    "medicalCenterId": "0h1-ucv-26",
    "medicalCenterName": "Brightbean",
    "beneficiaryId": "w31k22.97o",
    "patientId": "v1v53-mjb-91",
    "patientName": "Waylen Coye",
    "serviceType": "Alternative Medicine",
    "charge": "4399.00",
    "currency": "TRK",
    "serviceDate": "2022-10-31"
  },
  {
    "expenseReportId": "881-fso-09",
    "medicalCenterId": "3b0-fps-26",
    "medicalCenterName": "Flashpoint",
    "beneficiaryId": "r34u02.80m",
    "patientId": "n1f88-cuj-68",
    "patientName": "Alida Cadigan",
    "serviceType": "cosmetic surgery",
    "charge": "3023.11",
    "currency": "EUR",
    "serviceDate": "2022-07-31"
  }
  ]

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

const getExepseReports = async (req, res) => {
  try {
    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: {
        objectCount: expenseReportsExample.length,
        hasMore: false,
        objectArray: expenseReportsExample,
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
  getExepseReports
};
