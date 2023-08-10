const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { doctors } = require('./data/doctors.js');
const { patients } = require('./data/patients.js');
const Patient = require('./database/schemas/patient.js');
const Doctor = require('./database/schemas/doctor.js');
const PatientDoctor = require('./database/schemas/PatientDoctor.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await PatientDoctor.deleteMany();

    await Doctor.insertMany(doctors);

    await Patient.insertMany(patients);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await PatientDoctor.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
