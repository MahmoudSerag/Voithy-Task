const {
  getUserProfile,
  getAllDoctors,
  subscribeToDoctor,
  findPatientById,
  updatePatientName,
} = require('../database/models/user');
const httpErrors = require('http-errors');
const asyncHandler = require('../middlewares/async');

const { verifyJWT } = require('../utils/jwtService');
const { sendMail } = require('../utils/emailService');

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1,
    limit = 10;

  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const user = await getUserProfile(
    decodedToken.userId,
    decodedToken.role,
    page,
    limit
  );

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User profile fetched successfully.',
    user,
  });
});

exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1,
    limit = 10;

  const doctors = await getAllDoctors(page, limit);

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Doctors fetched successfully.',
    doctors: doctors || [],
  });
});

exports.subscribeToDoctor = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  await subscribeToDoctor(decodedToken.userId, req.params.doctorId);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Patient subscribed to doctor successfully.',
  });
});

exports.updatePatientName = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const patient = await findPatientById(req.params.patientId);

  if (!patient) return next(new httpErrors(404, 'Patient not found.'));

  if (patient.doctorId.toString() !== decodedToken.userId)
    return next(new httpErrors(403, 'Forbidden.'));

  await updatePatientName(patient, req.body);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Patient info updated successfully.',
  });
});

exports.sendNotification = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  const patient = await findPatientById(req.params.patientId);

  if (!patient) return next(new httpErrors(404, 'Patient not found.'));

  if (patient.doctorId.toString() !== decodedToken.userId)
    return next(new httpErrors(403, 'Forbidden.'));

  const message = `Hello ${patient.firstName} ${patient.lastName}, you should take this course.`;
  await sendMail(patient.email);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message,
  });
});
