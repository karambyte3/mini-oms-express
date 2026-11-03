const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: '404 ERROR. PAGE NOT FOUND!',
  });
};

export default notFoundHandler;
