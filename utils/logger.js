function info(...args) {
  console.log("[INFO]", ...args);
}

function error(...args) {
  console.error("[ERROR]", ...args);
}

function success(...args) {
  console.log("[SUCCESS]", ...args);
}

module.exports = {
  info,
  error,
  success
};
