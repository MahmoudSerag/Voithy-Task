const bcrypt = require('bcrypt');

exports.patients = [
  {
    firstName: 'Ali',
    lastName: 'Mohamed',
    role: 'patient',
    email: 'ahmed123@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    phoneNumber: '01067894561',
  },
  {
    firstName: 'Hamza',
    lastName: 'Khalid',
    role: 'patient',
    email: 'hamza100@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    phoneNumber: '01066524111',
  },
  {
    firstName: 'Yassen',
    lastName: 'Youssef',
    role: 'patient',
    email: 'youssefYasuo123@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    phoneNumber: '01065294036',
  },
  {
    firstName: 'Ahmed',
    lastName: 'Kamil',
    role: 'patient',
    email: 'Kamil5050@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    phoneNumber: '01266611154',
  },
  {
    firstName: 'Ramadan',
    lastName: 'Ahmed',
    role: 'patient',
    email: 'RamadanAhmed100@gmail.com',
    password: bcrypt.hashSync('123456789', 10),
    phoneNumber: '01256544699',
  },
];
