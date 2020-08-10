const express = require("express");
const router = express.Router();
const GenreController = require(".././controllers/GenreController");
const genreRouter = express.Router();

router.get("/genres", GenreController.genreList);

genreRouter.use("/", router);

module.exports = { genreRouter };
