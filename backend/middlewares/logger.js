const asyncHandler = require('./async');
const httpErrors = require('http-errors');

exports.checkAuthorization = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.accessToken)
    return next(new httpErrors(401, 'Unauthorized.'));

  next();
});
