function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}

function safeAppName(value) {
  return String(value)
    .trim()
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .slice(0, 40);
}

module.exports = {
  escapeHtml,
  safeAppName
};
