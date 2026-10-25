const { readDB, writeDB } = require("./database");

function getUser(id) {
  const db = readDB();
  return db.users[String(id)] || null;
}

function createUser(id, username, firstName) {
  const db = readDB();
  const key = String(id);

  if (!db.users[key]) {
    db.users[key] = {
      id,
      username: username || "",
      firstName: firstName || "User",
      referrals: [],
      referredBy: null,
      appsCreated: 0,
      createdAt: new Date().toISOString()
    };

    writeDB(db);
  }

  return db.users[key];
}

function updateUser(id, updates) {
  const db = readDB();
  const key = String(id);

  if (!db.users[key]) return null;

  Object.assign(db.users[key], updates);
  writeDB(db);

  return db.users[key];
}

module.exports = {
  getUser,
  createUser,
  updateUser
};
