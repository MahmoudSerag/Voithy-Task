const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const asyncHandler = require('../middlewares/async');

const generateHandlebarOptions = () => {
  const viewsPath = path.resolve('../Voithy-Task/backend/Views');

  return {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: viewsPath,
      defaultLayout: false,
    },
    viewPath: viewsPath,
    extName: '.handlebars',
  };
};

const generateMailOptions = asyncHandler((userMail) => {
  return {
    from: process.env.EMAIL_SENDER,
    to: userMail,
    subject: 'Important Notification: Stay Updated on Your Health Information.',
    text: `Exciting news! We've introduced a notification system to keep you updated on vital health updates.`,
    // template: 'email',
    // context: { message },
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

exports.sendMail = asyncHandler(async (userMail) => {
  const mailOptions = await generateMailOptions(userMail);
  console.log(mailOptions);
  // const handlebarsOptions = generateHandlebarOptions();
  const transport = await createTransport();

  // transport.use('compile', hbs(handlebarsOptions));

  await transport.sendMail(mailOptions);
});
