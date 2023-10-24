var express = require("express");
const getTitle = require("../modules/title_module");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const site_title = getTitle();
  res.render("index", { site_title });
});

module.exports = router;
