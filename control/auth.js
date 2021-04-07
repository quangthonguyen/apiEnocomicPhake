const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonWebToken");

module.exports.getUser = async () => {
  try {
    const result = await Users.find({});
    return result;
  } catch (error) {
    handEror(error);
    return error;
  }
};

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await new Users(req.body);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    if (error.code == 11000) {
      return res.status(200).json({ error: "Email already exists!" });
    }
    res.status(409).json({ error });
  }
};

module.exports.logIn = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ error: "Email not exit!" });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    console.log(result);
    if (result) {
      const token = jwt.sign({ _id: user["_id"] }, process.env.TOKEN_SECRET);
      const acsessToken = jwt.sign(
        { _id: user["_id"] },
        process.env.ACSESS_TOKEN_SECRET,
        { expiresIn: "900s" }
      );
      return res
        .status(200)
        .set({ token: token, acsesstoken: acsessToken })
        .json(user);
    }
    return res.status(200).json({ error: "Email or password wrong!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
