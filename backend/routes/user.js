const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getAllDoctors,
  subscribeToDoctor,
  updatePatientName,
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

router.patch(
  '/doctors/:patientId',
  checkUserAuthorization,
  isRoleDoctor,
  updatePatientName
);

module.exports = router;
