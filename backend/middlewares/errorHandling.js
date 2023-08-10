exports.handleError = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);
  error.message = err.message;
  error.statusCode = err.statusCode;

  if (error.message === 'jwt expired.' || error.message === 'jwt expired') {
    error.message = `The user's cookies has expired.`;
    error.statusCode = 401;
  }

  if (error.message.startsWith('Cast')) {
    error.message = `Invalid id.`;
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    statusCode: error.statusCode || 500,
    error: error.message || 'Internal Server Error.',
  });
};
