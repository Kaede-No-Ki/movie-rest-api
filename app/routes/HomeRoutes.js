const HomeController = require("../controllers/HomeController");

var router = require("express").Router();
var homeRouter = require("express").Router();

router.get("/", HomeController.home);

homeRouter.use("/home", router);

module.exports = { homeRouter };
