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
  validateLoginInputs,
} = require('../utils/inputsValidationService');
const { setCookie } = require('../utils/cookieService');
const { signJWT } = require('../utils/jwtService');
const { hashPassword, comparePassword } = require('../utils/passwordService');

exports.register = asyncHandler(async (req, res, next) => {
  if (!req.body || !req.body.role)
    return next(new httpErrors(400, 'Invalid request'));

  const { doctor, patient } = await findUserByEmail(req.body.email);
  if (doctor || patient)
    return next(new httpErrors(409, 'Email already exist'));

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

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

exports.login = asyncHandler(async (req, res, next) => {
  if (req.cookies.accessToken)
    return next(new httpErrors(406, 'Already logged in.'));

  if (!req.body) return next(new httpErrors(400, 'Invalid request'));

  const { error } = validateLoginInputs(req.body);

  if (error) return next(new httpErrors(400, error.details[0].message));

  const { doctor, patient } = await findUserByEmail(req.body.email);
  const user = doctor || patient;

  if (!user || !(await comparePassword(req.body.password, user.password)))
    return next(new httpErrors(401, 'Invalid credentials.'));

  const payload = { userId: user._id, role: user.role, email: user.email };
  const accessToken = await signJWT(payload);

  const cookieExpiredAt = new Date(
    Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
  );
  setCookie(res, 'accessToken', accessToken, cookieExpiredAt);

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: `User logged in successfully.`,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  if (!req.cookies.accessToken)
    return next(new httpErrors(406, 'Already logged out.'));

  res.clearCookie('accessToken');

  return res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User logged out successfully.',
  });
});
