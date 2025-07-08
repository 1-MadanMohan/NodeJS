const Movie = require("../models/Movie");

// 🌍 HTML view of all movies
exports.renderHTML = async (req, res) => {
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
};

// 📦 Get all movies (JSON)
exports.getAllMovies = async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
};

// 🔍 Get one movie
exports.getMovieById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const movie = await Movie.findOne({ id: userId });
  movie
    ? res.json(movie)
    : res.status(404).json({ message: "❌ Movie not found" });
};

// ➕ Add new movie
exports.addMovie = async (req, res) => {
  try {
    const latest = await Movie.findOne().sort({ id: -1 });
    const newId = latest ? latest.id + 1 : 1;

    const newMovie = new Movie({ ...req.body, id: newId });
    await newMovie.save();
    res.status(201).json({ status: "✅ Movie added", movie: newMovie });
  } catch (err) {
    res.status(500).json({ message: "❌ Error adding movie", error: err.message });
  }
};

// 📝 Update movie
exports.updateMovie = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const updatedMovie = await Movie.findOneAndUpdate({ id: userId }, req.body, { new: true });
    updatedMovie
      ? res.json({ status: "✅ Movie updated", movie: updatedMovie })
      : res.status(404).json({ message: "❌ Movie not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Update failed", error: err.message });
  }
};

// ❌ Delete movie
exports.deleteMovie = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const deleted = await Movie.findOneAndDelete({ id: userId });
    deleted
      ? res.json({ status: "✅ Movie deleted" })
      : res.status(404).json({ message: "❌ Movie not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Deletion failed", error: err.message });
  }
};
