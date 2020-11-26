const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/:userId", cartController.postCart);
router.delete("/:cartId", cartController.deleteCart);
// router.put("/:id/", cartController.updateCart);
// router.get("/:cartId/productos", cartController.getProductosInCart);
// router.post("/:id/productos/:idProducto", cartController.postProductosInCart);
// router.delete(
//   "/:id/productos/:idProducto",
//   cartController.deleteProductosInCart
// );
router.get("/getAllCarts", cartController.getAllCarts);

module.exports = router;
