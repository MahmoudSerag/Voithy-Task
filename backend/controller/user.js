const {
  getUserProfile,
  getAllDoctors,
  subscribeToDoctor,
  findPatientDoctorRelation,
  findPatientById,
  updatePatientName,
  checkPatientSubscription,
} = require('../database/models/user');
const httpErrors = require('http-errors');
const asyncHandler = require('../middlewares/async');

const { verifyJWT } = require('../utils/jwtService');
const { sendMail } = require('../utils/emailService');
const {
  validateNotificationInputs,
} = require('../utils/inputsValidationService');

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const user = await getUserProfile(decodedToken.userId, decodedToken.role);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User profile fetched successfully.',
    user,
  });
});

exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await getAllDoctors();

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Doctors fetched successfully.',
    doctors: doctors || [],
  });
});

exports.subscribeToDoctor = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const isPatientSubscribed = await checkPatientSubscription(
    decodedToken.userId,
    req.params.doctorId
  );

  if (isPatientSubscribed)
    return next(new httpErrors(403, 'Already subscribed.'));

  await subscribeToDoctor(decodedToken.userId, req.params.doctorId);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Patient subscribed to doctor successfully.',
  });
});

exports.updatePatientName = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const patientDoctor = await findPatientDoctorRelation(
    req.params.patientId,
    decodedToken.userId
  );

  if (!patientDoctor) return next(new httpErrors(404, 'Patient not found.'));

  if (patientDoctor.doctorId.toString() !== decodedToken.userId)
    return next(new httpErrors(403, 'Forbidden.'));

  await updatePatientName(patientDoctor, req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Patient info updated successfully.',
  });
});

exports.sendNotification = asyncHandler(async (req, res, next) => {
  if (!req.body) return next(new httpErrors(400, 'Invalid request'));

  const { error } = validateNotificationInputs(req.body);
  if (error) return next(new httpErrors(400, error.details[0].message));

  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const patientDoctor = await findPatientDoctorRelation(
    req.params.patientId,
    decodedToken.userId
  );

  if (!patientDoctor) return next(new httpErrors(404, 'Patient not found.'));

  if (patientDoctor.doctorId.toString() !== decodedToken.userId)
    return next(new httpErrors(403, 'Forbidden.'));

  const patient = await findPatientById(patientDoctor.patientId);

  await sendMail(patient.email, req.body.message);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: req.body.message,
  });
});
