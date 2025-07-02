// 🚀 Import Express
const express = require("express");
const app = express();
const PORT = 8000;
const fs = require("fs");


// 📁 Load user/movie data from JSON
const users = require("./MOCK_DATA.json");

// 🛠️ Middleware plugin
app.use(express.urlencoded({ extended: false })); // ✅ Parse URL-encoded bodies

// 🌍 Route 1: Serve an HTML page with the movie list
app.get("/users", (req, res) => {
  const html = `
    <h1>🎬 Movies List</h1>
    <ul>
      ${users.map(user => 
        `<li>👤 ID: ${user.id} | 📅 Year: ${user["Released Year"]} | 🎥 Title: ${user.Movie}| 🍿 Watched: ${user["Watched Year"]}| 😎Actor: ${user["Lead Actor"]}</li>`
      ).join('')}
    </ul>
  `; 
  res.send(html); // ✅ Send the HTML page
});

// 📦 Route 2: Return all users as JSON (API)
app.get("/api/users", (req, res) => {
  res.json(users); // 📤 Send full JSON array
});

// 🔍 Route 3: Return a specific user by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id); // 🔢 Get ID from URL
  const user = users.find(u => u.id === userId); // 🔍 Find user by ID

  if (user) {
    res.json(user); // ✅ Found, send user data
  } else {
    res.status(404).json({ message: "❌ User not found" }); // ❌ Not found
  }
});

const path = require("path");

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users), (err, data) => {
    return res.json({ status: "✅ User added successfully" });
  });
});

// 🚦 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});






















