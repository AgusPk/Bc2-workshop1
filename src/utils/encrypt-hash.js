const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const encryptPassword = async (passwordDB, passwordAPI) => {
  return await bcrypt.compare(passwordAPI, passwordDB);
};

module.exports = {
  hashPassword,
  encryptPassword,
};
