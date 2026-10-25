const { readDB, writeDB } = require("./database");

function addApp(userId, app) {
  const db = readDB();
  const id = String(userId);

  if (!db.apps[id]) {
    db.apps[id] = [];
  }

  db.apps[id].push({
    ...app,
    createdAt: new Date().toISOString()
  });

  writeDB(db);
}

function getApps(userId) {
  const db = readDB();
  return db.apps[String(userId)] || [];
}

module.exports = {
  addApp,
  getApps
};
