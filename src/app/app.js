const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const routeNotFound = require('./middlewares/routeNotFound.middleware');
const errorHandler = require('./middlewares/errorHandler.middleware');

class App {
  constructor() {
    this.express = express();
    this.middleweres();
    this.routes();
    this.handlers();
  }

  middleweres() {
    this.express.use(cors({ origin: true }));
    this.express.use(express.json());
  }

  routes() {
    this.express.use('/mid-server/api/v1', routes);
  }

  handlers() {
    this.express.use(routeNotFound);
    this.express.use(errorHandler);
  }
}

module.exports = new App().express;
