const HTTP = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

// Mock database
let database = [
  { id: 1, name: "First Item" },
  { id: 2, name: "Second Item" },
];

const server = HTTP.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  const log = `${new Date().toISOString()} : ${req.method} ${req.url} New Request received\n`;
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

    // Handle GET method
    if (req.method === "GET") {
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

        case "/feed/you": // 🧑‍💻 Personalized Feed
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

        case "/items": // 📄 Display all items
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(database));
          break;

        default: // 🚫 Unknown Route
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("🚫 Page not found!");
      }
    }

    // Handle POST method - Add item
    else if (req.method === "POST" && pathname === "/items") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const newItem = JSON.parse(body);
        newItem.id = database.length + 1;
        database.push(newItem);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "✅ Item Created", item: newItem }));
      });
    }

    // Handle PUT method - Update item
    else if (req.method === "PUT" && pathname.startsWith("/items/")) {
      const id = parseInt(pathname.split("/")[2]);
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const updatedItem = JSON.parse(body);
        const index = database.findIndex((item) => item.id === id);

        if (index !== -1) {
          database[index].name = updatedItem.name;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "♻️ Item Updated", item: database[index] }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "❌ Item Not Found" }));
        }
      });
    }

    // Handle DELETE method - Delete item
    else if (req.method === "DELETE" && pathname.startsWith("/items/")) {
      const id = parseInt(pathname.split("/")[2]);
      const index = database.findIndex((item) => item.id === id);

      if (index !== -1) {
        const deletedItem = database.splice(index, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "🗑️ Item Deleted", item: deletedItem[0] }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "❌ Item Not Found" }));
      }
    }

    // Method Not Supported
    else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("🚫 Method Not Allowed");
    }
  });
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/`);
});
