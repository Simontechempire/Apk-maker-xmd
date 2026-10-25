function validateUrl(value) {
  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        valid: false,
        message: "Only HTTP and HTTPS URLs are supported."
      };
    }

    if (url.username || url.password) {
      return {
        valid: false,
        message: "URLs containing credentials are not allowed."
      };
    }

    return {
      valid: true,
      url: url.toString()
    };
  } catch {
    return {
      valid: false,
      message: "Please provide a valid website URL."
    };
  }
}

function validateVersion(version) {
  return ["1.0.0", "2.0.0"].includes(version);
}

module.exports = {
  validateUrl,
  validateVersion
};
