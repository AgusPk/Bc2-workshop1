const jwt = require("jsonwebtoken");
const userDao = require("../daos/user.dao");
const { matchPassword } = require("../utils/encrypt-hash");

module.exports = {
  login: async (email, password) => {
    // chequeamos si el user existe
    const result = await userDao.exists(email, "email");
    const exists = result[0].exists;

    if (exists <= 0) {
      throw {
        unauthorized: true,
        message: "invalid login",
      };
    }

    const user = await userDao.getOneForEmail(email);
    const userPass = user[0].password;

    // chequeamos la password
    console.log(userPass);
    const checkPass = await matchPassword(userPass, password);
    if (!checkPass) {
      throw {
        unauthorized: true,
        message: "invalid login, incorrect password",
      };
    }

    //asignamos el jwt
    const payload = {
      check: true,
      role: exists.role,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: 60 * 60,
    });

    return {
      message: "Successfull login",
      token,
    };
  },
};
