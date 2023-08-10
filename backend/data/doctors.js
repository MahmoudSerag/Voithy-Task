const bcrypt = require('bcrypt');

exports.doctors = [
  {
    firstName: 'Ahmed',
    lastName: 'Serag',
    role: 'doctor',
    email: 'Ahmed50@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    licenseId: 'doctor1A',
    phoneNumber: '01067894561',
  },
  {
    firstName: 'Mohamed',
    lastName: 'Ali',
    role: 'doctor',
    email: 'MohamedAli500@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    licenseId: 'doctor1B',
    phoneNumber: '01067894532',
  },
  {
    firstName: 'Mahmoud',
    lastName: 'Youssef',
    role: 'doctor',
    email: 'MahmoudYoussef500@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    licenseId: 'doctor2C',
    phoneNumber: '01067894654',
  },
  {
    firstName: 'Hesham',
    lastName: 'Kamil',
    role: 'doctor',
    email: 'Hesham50@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    licenseId: 'doctor3C',
    phoneNumber: '01063214654',
  },
  {
    firstName: 'Youssef',
    lastName: 'Ahmed',
    role: 'doctor',
    email: 'YoussefAhmed@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    licenseId: 'doctor5FCA',
    phoneNumber: '01162514631',
  },
];
