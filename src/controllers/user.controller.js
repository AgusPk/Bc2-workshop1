const { next } = require("xid-js");
const userServices = require("../services/user.service.js");

const controllers = {
  getAll: async (req, res, next) => {
    try {
      const users = await userServices.getAll();

      return res.status(200).json({
        status: 200,
        response: users,
      });
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    const { id } = req.params;

    try {
      if (!id || typeof id !== "string") {
        return res.status(400).json({
          status: 400,
          message: "acá el mensaje",
        });
      }

      const user = await userServices.getOne(id);
      return res.status(200).json({
        status: 200,
        response: user,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    const { userName, firstName, lastName, email, password, role } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Required parameters are missing or wrong type",
      });
    }

    try {
      const userCreated = await userServices.create({
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
      });

      res.stasus(201).json(userCreated);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res) => {
    const { email, firstName, lastName, userName, role } = req.body;
    const { id } = req.params;

    if (
      (email && typeof email !== "string") ||
      (userName && typeof userName !== "string") ||
      (firstName && typeof firstName !== "string") ||
      (lastName && typeof lastName !== "string") ||
      (role && typeof role !== "string")
    ) {
      return res.status(400).json({
        status: 400,
        message: "Missing parameters or wrong type",
      });
    }

    try {
      const userUpated = await userService.update(id, {
        email,
        userName,
        firstName,
        lastName,
        role,
      });

      return res.status(200).json(userUpated);
    } catch (error) {
      next(err);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        status: 404,
        message: "required parameter is missing or wrong type",
      });
    }

    try {
      await userServices.delete(id);
      return res.sendStatus(202);
    } catch (error) {
      const status = error.status;
      if (status === undefined) return res.status(500).send();
      return res.status(status).send(error);
    }
  },
};

module.exports = controllers;
