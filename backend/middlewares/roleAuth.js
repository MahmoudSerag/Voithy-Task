const { verifyJWT } = require('../utils/jwtService');
const asyncHandler = require('../middlewares/async');
const httpErrors = require('http-errors');

exports.isRolePatient = asyncHandler(async (req, res, next) => {
  const decodedToken = await verifyJWT(req.cookies.accessToken);

  if (decodedToken.role !== 'patient')
    return next(new httpErrors(403, 'Forbidden.'));

  next();
});

exports.isRoleDoctor = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const decodedToken = await verifyJWT(accessToken);

  if (decodedToken.role !== 'doctor')
    return next(new httpErrors(403, 'Forbidden.'));

  next();
});
