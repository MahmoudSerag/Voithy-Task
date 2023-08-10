const { getUserProfile, getAllDoctors } = require('../database/models/user');
const httpErrors = require('http-errors');
const asyncHandler = require('../middlewares/async');
const {
  validateDoctorInputs,
  validatePatientInputs,
} = require('../utils/registerValidation');
const { validateLoginInputs } = require('../utils/loginValidation');
const { setCookie } = require('../utils/cookieService');
const { verifyJWT } = require('../utils/jwtService');
const { hashPassword, comparePassword } = require('../utils/passwordService');

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const page = Number(req.query.page) || 1,
    limit = 10;
  const accessToken = req.cookies.accessToken;
  const decodedToken = await verifyJWT(accessToken);

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
