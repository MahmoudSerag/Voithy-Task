const bcrypt = require('bcrypt');
const asyncHandler = require('../middlewares/async');

const generateSalt = asyncHandler(async () => {
  return await bcrypt.genSalt(10);
});

exports.hashPassword = asyncHandler(async (password) => {
  const salt = await generateSalt();
  return await bcrypt.hash(password, salt);
});

exports.comparePassword = asyncHandler(
  async (requestBodyPassword, userPassword) => {
    return (await bcrypt.compare(requestBodyPassword, userPassword))
      ? true
      : false;
  }
);
