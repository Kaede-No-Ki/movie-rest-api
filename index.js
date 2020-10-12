require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { homeRouter } = require("./app/routes/HomeRoutes");
const { detailRouter } = require("./app/routes/DetailRoutes");
const { episodeRouter } = require("./app/routes/EpisodeRoutes");
const { listRouter } = require("./app/routes/ListRoutes");
const { genreRouter } = require("./app/routes/GenreRoutes");
const { searchRouter } = require("./app/routes/SearchRoutes");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(homeRouter);
app.use(detailRouter);
app.use(episodeRouter);
app.use(listRouter);
app.use(genreRouter);
app.use(searchRouter);

app.use("/ping", (req, res) => {
  res.send({ status: true, message: "Hello im alive :D" });
});

app.use("*", (req, res) => {
  res.send({ status: false, message: "URL not found" });
});

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
