const Cart = require("../models/cart");

module.exports.addCart = async (req, res) => {
  try {
    const order = await new Cart(req.body).populate({
      path: "product",
    });
    const result = await order.save();
    const newCartItem = await Cart.findById(result._id).populate({
      path: "product",
    });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(409).json({ error });
  }
};

module.exports.getCartByBuyer = async (req, res) => {
  try {
    const data = await Cart.find({ buyer: req.params.id }).populate({
      path: "product",
    });
    const totalCart = await Cart.countDocuments({ buyer: req.params.id });
    res.status(201).json({ totalCart, data });
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};

module.exports.ChangeQuatity = async (req, res) => {
  try {
    const data = await Cart.updateOne(
      { _id: req.params.id },
      { quatity: parseInt(req.params.quatity) }
    );
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};

module.exports.DeleteItemCart = async (req, res) => {
  try {
    const data = await Cart.deleteOne({ _id: req.params.id });
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(409).json({ error });
  }
};
