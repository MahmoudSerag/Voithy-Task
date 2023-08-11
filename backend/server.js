const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const auth = require('./routes/auth');
const user = require('./routes/user');

const { handleError } = require('./middlewares/errorHandling');

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(xss());
app.use(helmet());

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', user);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

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
