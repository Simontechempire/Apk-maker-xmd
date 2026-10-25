const { addJob } = require("./queue-service");

function queueBuild(buildFunction) {
  return new Promise((resolve, reject) => {
    addJob(async () => {
      try {
        const result = await buildFunction();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = {
  queueBuild
};
