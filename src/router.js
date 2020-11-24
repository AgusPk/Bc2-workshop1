const express = require('express');
const homeController = require('./controllers/home.controller');
const router = express.Router();

router.get(`/home`, homeController.get);

module.exports = {router};
