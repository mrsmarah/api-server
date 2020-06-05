'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require('../routes/main-router.js');
const timeStamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const middleNotFound = require('../middleware/404.js');
const middleError = require('../middleware/500.js');
const app = express();

// global middleware
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());
app.use(timeStamp); //set to run for all routes
app.use(logger);

//Routers use
app.get('/', (req, res) => {
  res.send('API SERVER APP');
});
app.use(apiRouter);

// errors middleware
app.use('*', middleNotFound);
app.use(middleError);

/**
 * Server module will start the server to the port
 * @module server
 */

module.exports = {
  server: app,// exporting this for testing puposes
  start: (port) => {// exporting this for index.js
    const PORT = port || process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  },
};