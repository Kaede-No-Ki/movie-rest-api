const DetailController = require("../controllers/DetailController");

const router = require("express").Router();
const detailRouter = require("express").Router();

router.get("/series/:id", DetailController.series);
router.get("/episode/:id", DetailController.episode);
//router.get("/movies", HomeController.home);

detailRouter.use("/detail", router);

module.exports = { detailRouter };
