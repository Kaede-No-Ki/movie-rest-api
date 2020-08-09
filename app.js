require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { homeRouter } = require("./app/routes/HomeRoutes");
const { detailRouter } = require("./app/routes/DetailRoutes");
const { episodeRouter } = require("./app/routes/EpisodeRouter");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(homeRouter);
app.use(detailRouter);
app.use(episodeRouter);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
