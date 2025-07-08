const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  Movie: { type: String, required: true },
  "Watched Year": { type: Number, required: true },
  "Released Year": { type: Number, required: true },
  "Lead Actor": { type: String, required: true }
});

module.exports = mongoose.model("Movie", movieSchema);
