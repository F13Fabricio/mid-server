const { Router } = require('express');

const routes = Router();

routes.get('', (req, res) => {
  res.status(200).send({ message: 'Ok'});
});

module.exports = routes;
