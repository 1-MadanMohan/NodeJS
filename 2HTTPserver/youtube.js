const HTTP = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = HTTP.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  const log = `${new Date().toISOString()} : ${req.url} New Request received\n`;
  const myURL = url.parse(req.url, true);
  console.log(myURL);

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    const pathname = myURL.pathname;

    switch (pathname) {
      case "/results": // 🎯 Search Page
        const searchQuery = myURL.query.search_query;
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (searchQuery) {
          res.end(`🔍 You searched for: ${searchQuery}`);
        } else {
          res.end("🔍 Search page, but no query provided.");
        }
        break;

      case "/watch": // 🎬 Video Watch Page
        const videoId = myURL.query.v;
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (videoId) {
          res.end(`🎥 Now playing video ID: ${videoId}`);
        } else {
          res.end("🎥 Video page, but no video ID provided.");
        }
        break;

      case "/feed/you": // 🧑‍💻 You (Personalized Feed)
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("👤 Welcome to your personalized YouTube feed!");
        break;

      case "/playlist": // 🎵 Playlist Page
        const listId = myURL.query.list;
        res.writeHead(200, { "Content-Type": "text/plain" });
        if (listId) {
          res.end(`🎼 Viewing Playlist ID: ${listId}`);
        } else {
          res.end("🎼 Playlist page, but no list ID provided.");
        }
        break;

      default: // 🚫 Unknown Route
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("🚫 Page not found!");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
