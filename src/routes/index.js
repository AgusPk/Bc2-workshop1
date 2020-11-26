const router = require("express").Router();

const userRoutes = require("./user");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");

router.use("/users", userRoutes);
router.use("/cart", cartRouter);
router.use(`/product`, productRouter);

module.exports = router;
