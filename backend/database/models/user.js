const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const Patient = require('../schemas/patient');
const PatientDoctor = require('../schemas/PatientDoctor');

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

exports.checkPatientSubscription = asyncHandler(async (patientId, doctorId) => {
  return await PatientDoctor.findOne({ patientId, doctorId });
});

exports.subscribeToDoctor = asyncHandler(async (patientId, doctorId) => {
  await PatientDoctor.create({ patientId, doctorId });
});

exports.findPatientById = asyncHandler(async (patientId) => {
  return await Patient.findById({ _id: patientId });
});

exports.updatePatientName = asyncHandler(async (patient, body) => {
  patient.firstName = body.firstName;
  patient.lastName = body.lastName;

  await patient.save();
});
