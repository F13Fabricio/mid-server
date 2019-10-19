const express = require('express');
const cors = require('cors');

const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.middleweres();
    this.routes();
  }

  middleweres() {
    this.express.use(cors({ origin: true }));
    this.express.use(express.json());
  }

  routes() {
    this.express.use('/mid-server/api/v1', routes);
  }
}

module.exports = new App().express;
