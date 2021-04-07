var express = require("express");
const {
  addProduct,
  getProduct,
  getProductById,
  getListProductLikeName,
  getProductByTag,
  getNewProduct,
  getProductByVendor,
} = require("../control/managerProduct");
var router = express.Router();

router.post("/", function (req, res, next) {
  addProduct(req, res);
});

router.get(
  "/vendorId=:vendorId&limit=:limit&currentPage=:currentPage",
  function (req, res, next) {
    getProductByVendor(req, res);
  }
);

router.get("/id=:id", function (req, res, next) {
  getProductById(req, res);
});

router.get(
  "/searchName=:searchName&limit=:limit&currentPage=:currentPage",
  function (req, res, next) {
    getListProductLikeName(req, res);
  }
);

router.post(
  "/tag=:tag&limit=:limit&currentPage=:currentPage",
  function (req, res, next) {
    getProductByTag(req, res);
  }
);

router.get("/newProduct", function (req, res, next) {
  req.params.limit = 12;
  req.params.currentPage = 1;
  req.params.sort = { _id: -1 };
  getNewProduct(req, res);
});

module.exports = router;
