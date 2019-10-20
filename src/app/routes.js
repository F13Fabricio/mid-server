const { Router } = require('express');

const usersController = require('./controllers/users.controller');
const authorize = require('./middlewares/authorize.middleware');

const routes = Router();

routes.post('/users', usersController.create);
routes.get('/users/:userId', authorize, usersController.show);
routes.post('/login', usersController.login);

module.exports = routes;
