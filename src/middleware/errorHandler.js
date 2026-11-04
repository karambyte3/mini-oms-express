const errorHandler = (err, req, res, next) => {
  const errStack = err.stack;
  console.error(errStack);

  const responseJSON = {
    stack: process.env.NODE_ENV === 'production' ? '💥' : errStack,
  };

  const status = err.status || 500;
  // Client errors (4xx) are safe to show; for 5xx keep the internals hidden.
  const message = status < 500 ? err.message : 'Internal Server Error';

  res.status(status).json({ message, ...responseJSON });
};

export default errorHandler;
