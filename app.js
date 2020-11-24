const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {router} = require('./src/router');
const app = express();
const mainDBRepository = require('./src/repositories/main.repository');

mainDBRepository.connect();
app.mainDBRepository = mainDBRepository;

// Enable cors for public access
app.use(cors());

// JSON parsing
app.use(bodyParser.json());

// Other request types parsing
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Remove express header
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

// API requests routing
app.use('/', router);

module.exports = app;
