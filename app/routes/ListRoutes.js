const ListController = require("../controllers/ListController");

const router = require("express").Router();
const listRouter = require("express").Router();

router.get("/korean/:id", ListController.korean);
router.get("/korean", ListController.korean);

router.get("/west/:id", ListController.west);
router.get("/west", ListController.west);

router.get("/asia/:id", ListController.asia);
router.get("/asia", ListController.asia);

router.get("/movies/:id", ListController.movies);
router.get("/movies", ListController.movies);

//router.get("/movies", HomeController.home);

listRouter.use("/list", router);

module.exports = { listRouter };
