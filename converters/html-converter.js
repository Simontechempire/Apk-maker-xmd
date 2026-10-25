function validateHtml(html) {
  if (typeof html !== "string" || !html.trim()) {
    throw new Error("The HTML file is empty.");
  }

  if (!/<html[\s>]/i.test(html)) {
    throw new Error("A valid HTML document is required.");
  }

  return html;
}

module.exports = {
  validateHtml
};
