const queue = [];
let running = false;

function addJob(job) {
  queue.push(job);
  processQueue();
}

async function processQueue() {
  if (running) return;

  running = true;

  try {
    while (queue.length) {
      const job = queue.shift();

      try {
        await job();
      } catch (error) {
        console.error("Build job failed:", error);
      }
    }
  } finally {
    running = false;
  }
}

module.exports = {
  addJob
};
