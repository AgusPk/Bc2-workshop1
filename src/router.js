const express = require("express");
const homeController = require("./controllers/home.controller");
const productController = require("./controllers/product.controller");
const router = express.Router();

router.get(`/home`, homeController.get);
router.get(`/test`, productController.getProduct);

module.exports = { router };
