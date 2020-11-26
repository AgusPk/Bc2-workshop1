const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get(`/`, productController.getProduct);
router.post(`/`, productController.createProduct);
router.get(`/:id`, productController.showProduct);
router.put(`/:id`, productController.updateProduct);
router.delete(`/:id`, productController.deleteProduct);

module.export = router;
