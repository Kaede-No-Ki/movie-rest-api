const DetailController = require("../controllers/DetailController");
const ListDrakorController = require("../controllers/ListDrakorController");

const router = require("express").Router();
const listDrakorRouter = require("express").Router();

router.get("/:id", ListDrakorController.list);
router.get("/", ListDrakorController.list);

//router.get("/movies", HomeController.home);

listDrakorRouter.use("/list", router);

module.exports = { listDrakorRouter };
