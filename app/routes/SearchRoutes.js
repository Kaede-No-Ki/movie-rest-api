const ListController = require("../controllers/ListController");
const SearchController = require("../controllers/SearchController");

const router = require("express").Router();
const searchRouter = require("express").Router();

router.get("/:query/:page", SearchController.search);
router.get("/:query/", SearchController.search);

//router.get("/movies", HomeController.home);

searchRouter.use("/search", router);

module.exports = { searchRouter };
