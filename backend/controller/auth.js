const {
  createNewDoctor,
  createNewPatient,
  findUserByEmail,
} = require('../database/models/auth');
const httpErrors = require('http-errors');
const asyncHandler = require('../middlewares/async');
const {
  validateDoctorInputs,
  validatePatientInputs,
} = require('../utils/registerValidation');

exports.register = asyncHandler(async (req, res, next) => {
  if (!req.body || !req.body.role)
    return next(new httpErrors(400, 'Invalid request'));

  const isEmailExist = await findUserByEmail(req.body.email);
  if (isEmailExist) return next(new httpErrors(409, 'Email already exist'));

  if (req.body.role === 'doctor') {
    const { error } = validateDoctorInputs(req.body);
    if (error) return next(new httpErrors(400, error.details[0].message));

    await createNewDoctor(req.body);
  }

  if (req.body.role === 'patient') {
    const { error } = validatePatientInputs(req.body);
    if (error) return next(new httpErrors(400, error.details[0].message));

    await createNewPatient(req.body);
  }

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: `${req.body.role} created successfully.`,
  });
});
