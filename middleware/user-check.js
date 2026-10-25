const { getUser } = require("../database/users");

function isRegistered(userId) {
  return Boolean(getUser(userId));
}

module.exports = {
  isRegistered
};
