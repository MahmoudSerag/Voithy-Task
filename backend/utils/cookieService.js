const asyncHandler = require('../middlewares/async');
exports.setCookie = (res, cookieName, cookieValue, expirationDate) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: expirationDate,
  });
};
