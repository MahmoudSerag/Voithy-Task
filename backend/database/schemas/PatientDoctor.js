const mongoose = require('mongoose');

const PatientDoctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Doctor',
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Patient',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PatientDoctor', PatientDoctorSchema);
