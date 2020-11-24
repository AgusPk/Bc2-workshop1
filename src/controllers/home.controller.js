class homeController {

  static async get(req, res) {
      return res.send("Hello world");
  }
}

module.exports = homeController;
