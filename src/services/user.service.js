const userDao = require("../daos/user.dao");
const { hashPassword } = require("../utils/encrypt-hash");

const services = {
  getAll: async () => {
    return userDao.get();
  },

  getOne: async (id) => {
    const exist = await userDao.exists(id);
    if (exist == 0) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    return userDao.getOne(id);
  },

  create: async ({ userName, firstName, lastName, email, password, role }) => {
    const result = await userDao.exists(email, "email");
    const exists = result[0].exists;

    if (exists > 0) {
      throw {
        badRequest: true,
        message: "Email is already in use, try again",
      };
    }

    // encryptamos la password
    const passwordEncrypted = await hashPassword(password);

    const user = [
      userName,
      firstName,
      lastName,
      email,
      passwordEncrypted,
      role,
    ];

    return userDao.signUp(user);
  },

  delete: async (id) => {
    const exists = await userDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        status: 404,
        message: "Usuario no encontrado",
      };

    return userDao.delete(id);
  },

  update: async (id, body) => {
    const exists = await userDao.exists(id, "id");
    if (exists[0].exists === 0)
      throw {
        status: 404,
        message: "Usuario no encontrado",
      };

    return userDao.update(id, body);
  },
};

module.exports = services;
