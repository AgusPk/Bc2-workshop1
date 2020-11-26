const authService = require("../services/auth.service");

class authController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        status: 400,
        message: "Required parameter is missing or wrong type",
      });
    }

    try {
      const result = await authService.login(email, password);

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);

      if (error.unauthorized) {
        return res.status(401).send(error.message);
      }

      next(error);
    }
  }
}

module.exports = authController;
