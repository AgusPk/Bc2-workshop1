const router = require("express").Router();
const controllers = require("../controllers/user.controller");

router.get("/:id", controllers.getOne);
router.get("/", controllers.getAll);
router.post("/", controllers.create);
router.put("/:id", controllers.update);
router.delete("/:id", controllers.delete);

module.exports = router;
