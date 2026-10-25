const { validateUrl } = require("./validator");

function prepareUrl(url) {
  const result = validateUrl(url);

  if (!result.valid) {
    throw new Error(result.message);
  }

  return {
    type: "url",
    url: result.url
  };
}

module.exports = {
  prepareUrl
};
