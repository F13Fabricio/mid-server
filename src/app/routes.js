const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer.config');

const usersController = require('./controllers/users.controller');
const authorize = require('./middlewares/authorize.middleware');

const routes = Router();

routes.post('/users', usersController.create);
routes.get('/users/:userId', authorize, usersController.show);
routes.post('/login', usersController.login);

routes.post('/upload', multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file);

  res.status(200).send({ message: req.body.name });
});

module.exports = routes;
