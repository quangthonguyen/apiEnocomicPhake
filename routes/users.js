var express = require("express");
var router = express.Router();
var Users = require("../models/users");

/* GET users listing. */
router.post("/", function (req, res, next) {
  res.send("no");
});

module.exports = router;
