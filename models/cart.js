var mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "Product",
  },
  buyer: {
    type: mongoose.ObjectId,
    ref: "Users",
  },
  quatity: {
    type: "Number",
    required: true,
  },
});

const Cart = mongoose.model("cartSchema", cartSchema);

module.exports = Cart;
