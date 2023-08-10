const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['doctor', 'patient'],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      index: true,
      ref: 'Doctor',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', PatientSchema);
