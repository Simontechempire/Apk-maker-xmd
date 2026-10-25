const fs = require("fs");
const path = require("path");

function ensureDir(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function removeDir(directory) {
  if (fs.existsSync(directory)) {
    fs.rmSync(directory, {
      recursive: true,
      force: true
    });
  }
}

function safeFileName(value) {
  return path.basename(value).replace(
    /[^a-zA-Z0-9._-]/g,
    "_"
  );
}

module.exports = {
  ensureDir,
  removeDir,
  safeFileName
};
