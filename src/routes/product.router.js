const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const authMiddleware = require('../middlewares/auth.middleware')

router.get(`/`, productController.getProduct);
router.post(`/`, authMiddleware.validateAutentication, productController.createProduct);
router.get(`/:id`, productController.showProduct);
router.put(`/:id`, productController.updateProduct);
router.delete(`/:id`, productController.deleteProduct);

module.exports = router;
