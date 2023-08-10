const JWT = require('jsonwebtoken');
const asyncHandler = require('../middlewares/async');

exports.signJWT = asyncHandler((payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}`,
  });
});

exports.verifyJWT = asyncHandler(async (accessToken) => {
  return JWT.verify(accessToken, process.env.JWT_SECRET);
});
