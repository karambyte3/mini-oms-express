const errorHandler = (err, request, response, next) => {
  console.error(err.stack); // Optional: send to external logging service

  const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

  response.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '💥' : err.stack,
  });
};

export default errorHandler;
