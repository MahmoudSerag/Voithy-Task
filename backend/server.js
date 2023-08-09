const express = require('express');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { handleError } = require('./middlewares/errorHandling');

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Application/json',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(helmet());

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Url Not Found.',
  });
});

app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
