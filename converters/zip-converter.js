const fs = require("fs");
const path = require("path");

function findIndexHtml(directory) {
  const index = path.join(directory, "index.html");

  if (!fs.existsSync(index)) {
    throw new Error(
      "The uploaded website must contain index.html."
    );
  }

  return index;
}

module.exports = {
  findIndexHtml
};
