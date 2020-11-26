const express = require("express");
const router = express.Router();
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");

router.use("/carros", cartRouter);
router.use("/productos", productRouter);

module.exports = router;
