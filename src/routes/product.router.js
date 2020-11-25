const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get(`/test`, productController.getProduct);
router.post(`/testPost`, productController.createProduct);

module.export = router;
