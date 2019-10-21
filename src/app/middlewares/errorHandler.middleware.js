 
module.exports = (err, req, res, next) => {
  const { status, message } = err;
  return res.status(status || 500).send({ error: message });
};
