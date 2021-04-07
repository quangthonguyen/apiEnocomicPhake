const Product = require("../models/product");
const jwt = require("jsonWebToken");

module.exports.getProductByVendor = async (req, res) => {
  try {
    const { limit, currentPage, vendorId } = req.params;
    const totalRow = await Product.countDocuments();
    const totalPage = Math.ceil(totalRow / parseInt(limit));
    const data = await Product.find({ vendor: vendorId })
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(currentPage) - 1))
      .sort({ _id: -1 })
      .populate({
        path: "vendor",
        select: ["firstName", "lastName"],
      });
    const pagination = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      totalPage: totalPage,
    };
    res.status(201).json({ pagination, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getProductByType = async (req, res) => {
  try {
    const { limit, currentPage } = req.params;
    const totalRow = await Product.countDocuments();
    const totalPage = Math.ceil(totalRow / parseInt(limit));
    const data = await Product.find()
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(currentPage) - 1))
      .sort({ _id: -1 })
      .populate({
        path: "vendor",
        select: ["firstName", "lastName"],
      });
    const pagination = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      totalPage: totalPage,
    };
    res.status(201).json({ pagination, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await new Product(req.body);
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate({
      path: "vendor",
      select: ["firstName", "lastName"],
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};

module.exports.getListProductLikeName = async (req, res) => {
  try {
    const { searchName, limit, currentPage } = req.params;
    const data = await Product.find({
      productName: { $regex: new RegExp(searchName, "i") },
    })
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(currentPage) - 1))
      .sort({ _id: -1 })
      .populate({
        path: "vendor",
        select: ["firstName", "lastName"],
      });
    const totalRow = await data.length;
    const totalPage = Math.ceil(totalRow / parseInt(limit));
    const pagination = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      totalPage: totalPage,
    };
    res.status(201).json({ pagination, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getProductByTag = async (req, res) => {
  try {
    const { limit, currentPage, tag } = req.params;
    const sort = req.body.sort;
    console.log(tag);
    const data = await Product.find({ type: tag })
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(currentPage) - 1))
      .sort(sort)
      .populate({
        path: "vendor",
        select: ["firstName", "lastName"],
      });
    const totalRow = await data.length;
    const totalPage = Math.ceil(totalRow / parseInt(limit));
    const pagination = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      totalPage: totalPage,
    };
    res.status(201).json({ pagination, data, sort });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports.getNewProduct = async (req, res) => {
  try {
    const { limit, currentPage, sort } = req.params;
    const data = await Product.find()
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (parseInt(currentPage) - 1))
      .sort(sort)
      .populate({
        path: "vendor",
        select: ["firstName", "lastName"],
      });
    const totalRow = await data.length;
    const totalPage = Math.ceil(totalRow / parseInt(limit));
    const pagination = {
      limit: parseInt(limit),
      currentPage: parseInt(currentPage),
      totalPage: totalPage,
    };
    res.status(201).json({ pagination, data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
