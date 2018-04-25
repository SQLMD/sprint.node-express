const router = require("express").Router();
const controller = require("./api.controller.js");

router.get("/", controller.hello);
router.get("/quotes", controller.quotes);
router.get("/quotes/random", controller.randomQuote);
router.post("/quotes", controller.postQuote);
router.put("/quotes", controller.putQuote);

module.exports = router;
