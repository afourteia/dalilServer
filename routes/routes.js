// importing dependencies and files/modules
// importing express server from express
const express = require(`express`);
// importing router from express
const router = express.Router();

// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

// importing users middleware
const { createUsers, getUsers } = require(`../middlewares/userMiddleware`);

// importing benefitPolicies middleware
const {
  benefitPolicies,
  getClaims,
  createClaim,
  getExpenseReports,
} = require(`../middlewares/benefitPoliciesMiddleware`);

// importing medicalFiles middleware
const {
  singleMedicalFiles,
  singlePatientMedicalFiles,
} = require(`../middlewares/medicalFilesMiddleware`);

// importing beneficiary middleware
const {
  createBeneficiary,
  getBeneficiaries,
  singleBeneficiary,
  updateBeneficiary,
} = require(`../middlewares/beneficiaryMiddleware`);

// importing appointment middleware
const {
  createAppointment,
  updateAppointment,
  specificAppointment,
  doctorAppointmentSummaries,
  doctorAppointments,
  allAppointments,
} = require(`../middlewares/appointmentMiddleware`);

// importing schedules middleware
const {
  createSchedule,
  updateSchedule,
  allDoctorSchedule,
  specificSchedule,
  allSchedule,
  deleteSchedule,
} = require(`../middlewares/scheduleMiddleware`);

// importing doctor middleware
const {
  createDoctor,
  singleDoctor,
  updateDoctor,
  deleteDoctor,
  allDoctor,
} = require(`../middlewares/doctorMiddleware`);

const {
  createmedicalCenter,
  singlemedicalCenter,
  updatemedicalCenter,
  deletemedicalCenter,
  allmedicalCenter,
} = require(`../middlewares/medicalCenterMiddleware`);

const {
  createmedicalSpecialty,
  allmedicalSpecialty,
} = require(`../middlewares/medicalSpecialtyMiddleware`);

const {
  allMedicalServices,
} = require(`../middlewares/medicalServicesMiddelware`);

const { createCity, allCity } = require(`../middlewares/cityMiddleware`);

const { login, logout } = require(`../middlewares/loginMiddleware`);

const {
  createInstitute,
  getInstitutions,
} = require(`../middlewares/instituteMiddleware`);
// importing authentication/authorization middleware
const { authentication, cookieVerification, isAdmin } = require(`../auth`);

// All routes
// routes for user
router
  .route(`/v1/users`)
  .post(authentication, isAdmin, createUsers)
  .get(authentication, getUsers);

// routes for beneficiary
router
  .route(`/v1/beneficiaries`)
  .post(authentication, createBeneficiary)
  .get(authentication, getBeneficiaries);

// routes for beneficiary's medicalFiles
router
  .route(`/v1/beneficiaries/:beneficiaryId/medicalFiles`)
  .get(authentication, cookieVerification, singleMedicalFiles);

// routes for single beneficiary and updating it
router
  .route(`/v1/beneficiaries/:beneficiaryId`)
  .get(authentication, cookieVerification, singleBeneficiary)
  .patch(authentication, cookieVerification, updateBeneficiary);

// routes for single beneficiary's expense reports
router
  .route(`/v1/beneficiaries/:beneficiaryId/expenseReports`)
  .get(authentication, cookieVerification, getExpenseReports);

// routes for beneficiary's benefit policy
router
  .route(`/v1/beneficiaries/:beneficiaryId/benefitPolicies`)
  .get(authentication, cookieVerification, benefitPolicies);

// routes for beneficiary's expense claim
router
  .route(`/v1/beneficiaries/:beneficiaryId/claims`)
  .get(authentication, cookieVerification, getClaims)
  .post(authentication, cookieVerification, createClaim);
// routes for appointments
router
  .route(`/v1/appointments/users/:userId`)
  .get(authentication, specificAppointment)
  .post(authentication, cookieVerification, createAppointment);

// routes for appointment
router.route(`/v1/appointments`).get(authentication, allAppointments);
router
  .route(`/v1/appointments/:appointmentId`)
  .get(authentication, cookieVerification)
  .patch(authentication, cookieVerification, updateAppointment);

// routes for schedules
router
  .route(`/v1/schedules`)
  .get(authentication, allSchedule)
  .post(authentication, cookieVerification, createSchedule);
router
  .route(`/v1/schedules/:scheduleId`)
  .get(authentication, specificSchedule)
  .patch(authentication, updateSchedule)
  .delete(authentication, deleteSchedule);

// routes for doctors
router
  .route(`/v1/doctors`)
  .get(authentication, allDoctor)
  .post(authentication, createDoctor);

// routes for doctor
router
  .route(`/v1/doctors/:doctorId`)
  .get(authentication, singleDoctor)
  .patch(authentication, updateDoctor)
  .delete(authentication, deleteDoctor);

// routes for doctor
router
  .route(`/v1/doctors/:doctorId/appointmentSummaries`)
  .get(authentication, doctorAppointmentSummaries);

// routes for doctor appointments
router
  .route(`/v1/doctors/:doctorId/appointments`)
  .get(authentication, doctorAppointments);

// routes for doctor schedules
router
  .route(`/v1/doctors/:doctorId/schedules`)
  .get(authentication, allDoctorSchedule);

// routes for doctor
router
  .route(`/v1/patients/:patientId/medicalFiles`)
  .get(authentication, singlePatientMedicalFiles);

// routes for medicalCenters
router
  .route(`/v1/medicalcenters`)
  .get(authentication, allmedicalCenter)
  .post(authentication, createmedicalCenter);

// routes for medicalCenter
router
  .route(`/v1/medicalcenters/:medicalCenterId`)
  .get(authentication, singlemedicalCenter)
  .patch(authentication, updatemedicalCenter)
  .delete(authentication, deletemedicalCenter);

// routes for medicalSpecialty
router
  .route(`/v1/medicalspecialties`)
  .post(authentication, createmedicalSpecialty)
  .get(authentication, allmedicalSpecialty);

// routes for medicalServices
router.route(`/v1/medicalServices`).get(authentication, allMedicalServices);

// routes for cities
router
  .route(`/v1/cities`)
  .post(authentication, createCity)
  .get(authentication, allCity);

// routes for login
router.route(`/v1/login`).post(login);

// routes for logout
router.route(`/v1/logout`).post(logout);

//routes for institution
router
  .route(`/v1/institutions`)
  .post(authentication, createInstitute)
  .get(authentication, getInstitutions);

// exporting router
module.exports = router;
