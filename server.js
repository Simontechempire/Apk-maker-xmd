const http = require("http");

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
      status: "online",
      bot: "APK MAKER XMD"
    }));
  }

  res.writeHead(200, {
    "Content-Type": "text/plain"
  });

  res.end("APK MAKER XMD is running!");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});
