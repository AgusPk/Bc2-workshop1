const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const matchPassword = async (passwordDB, passwordAPI) => {
  console.log(passwordDB);
  console.log(passwordAPI);
  return await bcrypt.compare(passwordAPI, passwordDB);
};

module.exports = {
  hashPassword,
  matchPassword,
};
