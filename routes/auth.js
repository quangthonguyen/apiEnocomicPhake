var express = require("express");
var router = express.Router();
var Users = require("../models/users");
const { register, logIn } = require("../control/auth");

router.post("/register", function (req, res, next) {
  register(req, res);
});

router.post("/logIn", function (req, res, next) {
  logIn(req, res);
});

module.exports = router;
