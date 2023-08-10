const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const Patient = require('../schemas/patient');

exports.findUserByEmail = asyncHandler(async (email) => {
  return await Doctor.findOne({ email }).lean();
});

exports.createNewDoctor = asyncHandler(async (body) => {
  await Doctor.create(body);
});

exports.createNewPatient = asyncHandler(async (body) => {
  await Patient.create(body);
});
