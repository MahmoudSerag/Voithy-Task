const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const Patient = require('../schemas/patient');

exports.findUserByEmail = asyncHandler(async (email) => {
  const doctor = await Doctor.findOne({ email }).lean();
  const patient = await Patient.findOne({ email }).lean();
  return { doctor, patient };
});

exports.createNewDoctor = asyncHandler(async (body) => {
  await Doctor.create(body);
});

exports.createNewPatient = asyncHandler(async (body) => {
  await Patient.create(body);
});
