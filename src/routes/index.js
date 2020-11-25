const express = require("express");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const router = express.Router();

router.use("/cart", cartRouter);
router.get(`/product`, productRouter);

module.exports = { router };
