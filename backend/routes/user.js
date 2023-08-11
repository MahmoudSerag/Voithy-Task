const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getAllDoctors,
  subscribeToDoctor,
  updatePatientName,
  sendNotification,
  getPatientDetails,
} = require('../controller/user');

const { checkUserAuthorization } = require('../middlewares/logger');
const { isRoleDoctor, isRolePatient } = require('../middlewares/roleAuth');

router.get('/profile', checkUserAuthorization, getUserProfile);

router.get('/doctors', checkUserAuthorization, isRolePatient, getAllDoctors);

router.post(
  '/doctors/:doctorId',
  checkUserAuthorization,
  isRolePatient,
  subscribeToDoctor
);

router
  .route('/doctors/:patientId')
  .patch(checkUserAuthorization, isRoleDoctor, updatePatientName)
  .get(checkUserAuthorization, isRoleDoctor, getPatientDetails);

router.post(
  '/doctors/notification/:patientId',
  checkUserAuthorization,
  isRoleDoctor,
  sendNotification
);

module.exports = router;
