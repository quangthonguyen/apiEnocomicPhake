var mongoose = require("mongoose");
const { Schema } = mongoose;
var { isURL } = require("validator");

const productSchema = new Schema({
  productName: {
    type: "String",
    required: true,
  },
  vendor: {
    type: mongoose.ObjectId,
    ref: "Users",
  },
  price: {
    type: "Number",
    required: true,
  },
  type: {
    type: "String",
    required: true,
  },
  stock: {
    type: "Number",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  image: {
    type: [
      {
        type: "String",
        validate: [isURL, "image must url link!"],
      },
    ],
    require: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
