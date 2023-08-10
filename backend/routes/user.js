const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  getAllDoctors,
  subscribeToDoctor,
} = require('../controller/user');

const { checkUserAuthorization } = require('../middlewares/logger');
const { checkRole } = require('../middlewares/roleAuth');

router.get('/profile', checkUserAuthorization, getUserProfile);

router.get('/doctors', checkUserAuthorization, checkRole, getAllDoctors);

router.post(
  '/doctors/:doctorId',
  checkUserAuthorization,
  checkRole,
  subscribeToDoctor
);

module.exports = router;
