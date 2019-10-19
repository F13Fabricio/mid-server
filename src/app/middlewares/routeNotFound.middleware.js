module.exports = (req, res, next) => {
  console.log('entrou')
  const error = new Error('Route Not Found');
  error.status = 404;

  next(error);
};
