const { Router } = require('express');

const usersController = require('./controllers/users.controller');

const routes = Router();

routes.post('/users', usersController.create);
routes.get('/users/:id', usersController.show);

module.exports = routes;
