const errorHandler = (err, req, res, next) => {
  const errStack = err.stack;
  console.error(errStack);

  const responseJSON = {
    stack: process.env.NODE_ENV === 'production' ? '💥' : errStack,
  };

  res
    .status(err.status || 500)
    .json({ message: 'errorHandler.js: Internal Server Error.', ...responseJSON });
};

export default errorHandler;
