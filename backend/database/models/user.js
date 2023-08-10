const asyncHandler = require('../../middlewares/async');
const Doctor = require('../schemas/doctor');
const patient = require('../schemas/patient');
const Patient = require('../schemas/patient');
const PatientDoctor = require('../schemas/PatientDoctor');

exports.getUserProfile = asyncHandler(async (userId, role, page, limit) => {
  if (role === 'doctor') {
    const doctor = await Doctor.findById({ _id: userId })
      .select('-password -role -createdAt -updatedAt -__v')
      .lean();

    const patients = await PatientDoctor.find({ doctorId: doctor._id })
      .select('-doctorId -createdAt -updatedAt -__v')
      .populate({
        path: 'patientId',
        select: 'firstName lastName phoneNumber email',
        model: Patient,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const patientsInfo = [];
    patients.forEach((patient) => {
      delete patient._id;
      patientsInfo.push(patient.patientId);
    });
    doctor.patients = patientsInfo;

    return doctor;
  }

  const patient = await Patient.findById({ _id: userId })
    .select('-password -role -createdAt -updatedAt -__v')
    .lean();

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

exports.findPatientDoctorRelation = asyncHandler(
  async (patientId, doctorId) => {
    return await PatientDoctor.findOne({
      doctorId: doctorId,
      patientId: patientId,
    });
  }
);

exports.findPatientById = asyncHandler(async (patientId) => {
  return await Patient.findById({ _id: patientId }).lean();
});

exports.updatePatientName = asyncHandler(async (patientDoctor, body) => {
  await Patient.findByIdAndUpdate({ _id: patientDoctor.patientId }, body);
});
