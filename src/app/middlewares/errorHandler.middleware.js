 
module.exports = (err, req, res, next) => {
  const { status, message } = err;
  console.error(error);
  return res.status(status || 500).send({ error: message });
};
