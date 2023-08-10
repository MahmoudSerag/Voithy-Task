const { verifyJWT } = require('../utils/jwtService');
const asyncHandler = require('../middlewares/async');
const httpErrors = require('http-errors');

exports.checkRole = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const decodedToken = await verifyJWT(accessToken);

  if (decodedToken.role !== 'patient')
    return next(new httpErrors(403, 'Forbidden.'));

  next();
});
