const nodemailer = require('nodemailer');
const asyncHandler = require('../middlewares/async');

const generateMailOptions = asyncHandler((userMail, message) => {
  return {
    from: process.env.EMAIL_SENDER,
    to: userMail,
    subject: 'Important Notification: Stay Updated on Your Health Information.',
    html: `<h2>Exciting news! We've introduced a notification system to keep you updated on vital health updates.</h2><h3>Here's a message from your doctor:</h3><h3>Message: ${message}</h3>`,
  };
});

const createTransport = asyncHandler(async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
});

exports.sendMail = asyncHandler(async (userMail, message) => {
  const mailOptions = await generateMailOptions(userMail, message);

  const transport = await createTransport();

  await transport.sendMail(mailOptions);
});
