const express = require("express");
const { connectMongoDB } = require("./db/connection");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/users", movieRoutes);  // JSON routes
app.use("/users", movieRoutes);      // HTML route

// Start server after DB connects
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
