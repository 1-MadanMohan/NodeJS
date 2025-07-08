const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/html", movieController.renderHTML);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.addMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
