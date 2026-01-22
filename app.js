const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from basic Node server",
      time: new Date().toISOString(),
    }),
  );
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
