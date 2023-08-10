const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const Patient = require('../schemas/patient');

exports.getUserProfile = asyncHandler(async (userId, role) => {
  if (role === 'doctor')
    return await Doctor.findById({ _id: userId })
      .select('-password -role -createdAt -updatedAt -__v')
      .lean();

  return await Patient.findById({ _id: userId })
    .select('-password -role -createdAt -updatedAt -__v')
    .populate({
      path: 'doctorId',
      select: 'firstName lastName phoneNumber -createdAt -updatedAt -__v',
      model: Doctor,
    })
    .lean();
});
