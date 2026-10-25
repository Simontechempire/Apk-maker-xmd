const fs = require("fs");
const path = require("path");

const DB_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DB_DIR, "database.json");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify({
      users: {},
      apps: {}
    }, null, 2)
  );
}

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  const temporaryFile = DB_FILE + ".tmp";

  fs.writeFileSync(
    temporaryFile,
    JSON.stringify(data, null, 2)
  );

  fs.renameSync(temporaryFile, DB_FILE);
}

module.exports = {
  readDB,
  writeDB
};
