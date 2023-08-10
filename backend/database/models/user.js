const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const Patient = require('../schemas/patient');

exports.getUserProfile = asyncHandler(async (userId, role, page, limit) => {
  if (role === 'doctor') {
    const doctor = await Doctor.findById({ _id: userId })
      .select('-password -role -createdAt -updatedAt -__v')
      .lean();

    const patients = await Patient.find({ doctorId: doctor._id })
      .select('-password -doctorId -role -createdAt -updatedAt -__v')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    doctor.patients = patients;

    return doctor;
  }

  const patient = await Patient.findById({ _id: userId })
    .select('-password -role -createdAt -updatedAt -__v')
    .populate({
      path: 'doctorId',
      select: 'firstName lastName phoneNumber email -_id',
      model: Doctor,
    })
    .lean();

  patient.doctor = patient.doctorId;
  delete patient.doctorId;

  return patient;
});

exports.getAllDoctors = asyncHandler(async (page, limit) => {
  return await Doctor.find()
    .select('-password -role -createdAt -updatedAt -__v')
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
});

exports.subscribeToDoctor = asyncHandler(async (patientId, doctorId) => {
  const doctor = await Doctor.findById({ _id: doctorId }).lean();
  const patient = await Patient.findById({ _id: patientId });

  patient.doctorId = doctor._id;
  patient.save();
});
