const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes");
const cors = require("cors");
const app = express();

const mainDBRepository = require("./src/repositories/main.repository");
mainDBRepository.connect();
app.mainDBRepository = mainDBRepository;

// set enviroment variables
require("dotenv").config();

// Enable cors for public accekjss
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
  res.removeHeader("X-Powered-By");
  next();
});
// API requests routing
app.use("/", router);

module.exports = app;
