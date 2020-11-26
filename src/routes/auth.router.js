const router = require("express").Router();
const authControllers = require("../controllers/auth.controller");

router.post("/login", authControllers.login);

module.exports = router;
