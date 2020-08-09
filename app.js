require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { homeRouter } = require("./app/routes/HomeRoutes");
const { default: Axios } = require("axios");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(homeRouter);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
