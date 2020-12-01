const router = require("express").Router();

const userRoutes = require("./user");
const productRouter = require("./product.router");
const cartRouter = require("./cart.router");
const authRoutes = require("./auth.router");

/* Auth */

router.use("/cart", cartRouter);
router.use("/users", userRoutes);
router.use(`/product`, productRouter);
router.use("/auth", authRoutes);

module.exports = router;
