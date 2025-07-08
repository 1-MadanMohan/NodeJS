const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// 🔌 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Movies-List')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error", err));

// 🎬 Movie Schema
const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  Movie: { type: String, required: true },
  "Watched Year": { type: Number, required: true },
  "Released Year": { type: Number, required: true },
  "Lead Actor": { type: String, required: true }
});

const Movie = mongoose.model("Movie", movieSchema);

// 🛠️ Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
===================================
  📦 Routes — MongoDB Version
===================================
*/

// 🌍 HTML View of All Movies
app.get("/users", async (req, res) => {
  const movies = await Movie.find({});
  const html = `
    <h1>🎬 Movies List</h1>
    <ul>
      ${movies.map(user =>
        `<li>👤 ID: ${user.id} | 📅 Year: ${user["Released Year"]} | 🎥 Title: ${user.Movie} | 🍿 Watched: ${user["Watched Year"]} | 😎 Actor: ${user["Lead Actor"]}</li>`
      ).join('')}
    </ul>
  `;
  res.send(html);
});

// 📦 Get All Movies (JSON)
app.get("/api/users", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

// 🔍 Get Movie by ID
app.get("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const movie = await Movie.findOne({ id: userId });
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "❌ Movie not found" });
  }
});

// ➕ Add New Movie
app.post("/api/users", async (req, res) => {
  try {
    const latest = await Movie.findOne().sort({ id: -1 });
    const newId = latest ? latest.id + 1 : 1;

    const newMovie = new Movie({ ...req.body, id: newId });
    await newMovie.save();
    res.status(201).json({ status: "✅ Movie added", movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: "❌ Error adding movie", error: err.message });
  }
});

// 📝 Update Movie
app.put("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const updatedMovie = await Movie.findOneAndUpdate({ id: userId }, req.body, { new: true });
    if (updatedMovie) {
      res.json({ status: "✅ Movie updated", movie: updatedMovie });
    } else {
      res.status(404).json({ message: "❌ Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "❌ Update failed", error: err.message });
  }
});

// ❌ Delete Movie
app.delete("/api/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const deleted = await Movie.findOneAndDelete({ id: userId });
    if (deleted) {
      res.json({ status: "✅ Movie deleted" });
    } else {
      res.status(404).json({ message: "❌ Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "❌ Deletion failed", error: err.message });
  }
});

// 🚦 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


























// // 🚀 Import Express
// const express = require("express");
// const app = express();
// const PORT = 8000;
// const fs = require("fs");
// const path = require("path");
// const mongoose = require("mongoose");;
// mongoose.connect('mongodb://127.0.0.1:27017/Movies-List')
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB error:", err));

// const movieSchema = new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   Movie: {
//     type: String,
//     required: true
//   },
//   "Watched Year": {
//     type: Number,
//     required: true
//   },
//   "Released Year": {
//     type: Number,
//     required: true
//   },
//   "Lead Actor": {
//     type: String,
//     required: true
//   }
// });

// const User = mongoose.model("Movie", movieSchema);
// // 📁 Load user/movie data from JSON
// let users = require("./MOCK_DATA.json");

// // 🛠️ Middleware plugin
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // For parsing JSON bodies

// // 🌍 Route 1: Serve an HTML page with the movie list
// app.get("/users", (req, res) => {
//   const html = `
//     <h1>🎬 Movies List</h1>
//     <ul>
//       ${users.map(user => 
//         `<li>👤 ID: ${user.id} | 📅 Year: ${user["Released Year"]} | 🎥 Title: ${user.Movie}| 🍿 Watched: ${user["Watched Year"]}| 😎 Actor: ${user["Lead Actor"]}</li>`
//       ).join('')}
//     </ul>
//   `; 
//   res.send(html);
// });

// // 📦 Route 2: Return all users as JSON (API)
// app.get("/api/users", (req, res) => {
//   res.json(users);
// });

// // 🔍 Route 3: Return a specific user by ID
// app.get("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find(u => u.id === userId);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "❌ User not found" });
//   }
// });

// // ➕ Route 4: Create a new user
// app.post("/api/users", (req, res) => {
//   const body = req.body;

//   const newUser = {
//     ...body,
//     id: users.length + 1,
//   };

//   users.push(newUser);

//   fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
//     if (err) return res.status(500).json({ message: "❌ Failed to save user" });
//     res.status(201).json({ status: "✅ User added successfully", user: newUser });
//   });
// });

// // 📝 Route 5: Update an existing user
// app.put("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const index = users.findIndex(u => u.id === userId);

//   if (index === -1) {
//     return res.status(404).json({ message: "❌ User not found" });
//   }

//   users[index] = { ...users[index], ...req.body };

//   fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
//     if (err) return res.status(500).json({ message: "❌ Failed to update user" });
//     res.json({ status: "✅ User updated", user: users[index] });
//   });
// });

// // ❌ Route 6: Delete a user
// app.delete("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const filteredUsers = users.filter(u => u.id !== userId);

//   if (filteredUsers.length === users.length) {
//     return res.status(404).json({ message: "❌ User not found" });
//   }

//   users = filteredUsers;

//   fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
//     if (err) return res.status(500).json({ message: "❌ Failed to delete user" });
//     res.json({ status: "✅ User deleted" });
//   });
// });

// // 🚦 Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });
