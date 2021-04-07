var express = require("express");
const {
  addCart,
  getCartByBuyer,
  ChangeQuatity,
  DeleteItemCart,
} = require("../control/cart");
var router = express.Router();
var Cart = require("../models/cart");

router.post("/", function (req, res, next) {
  addCart(req, res);
});

router.get("/:id", function (req, res, next) {
  getCartByBuyer(req, res);
});

router.get("/changeQuatity/:id&:quatity", function (req, res, next) {
  ChangeQuatity(req, res);
});

router.delete("/:id", function (req, res, next) {
  DeleteItemCart(req, res);
});

module.exports = router;
