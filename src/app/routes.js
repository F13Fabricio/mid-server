const { Router } = require('express');
const multerConfig = require('../config/multer.config');
const multer = require('multer')(multerConfig).single('file');

const usersController = require('./controllers/users.controller');
const placesController = require('./controllers/places.controller');
const authorize = require('./middlewares/authorize.middleware');

const routes = Router();

routes.post('/users', usersController.create);
routes.get('/users/:userId', authorize, usersController.show);
routes.post('/login', usersController.login);

routes.post('/users/:userId/places', authorize, multer, placesController.create);
routes.get('/places', placesController.index);
routes.get('/places/:placeId', placesController.show);

module.exports = routes;
