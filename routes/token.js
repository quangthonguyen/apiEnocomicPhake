var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", function (req, res, next) {
  try {
    const user = jwt.verify(req.headers["token"], process.env.TOKEN_SECRET);
    const acsessToken = jwt.sign(
      { _id: user["_id"] },
      process.env.ACSESS_TOKEN_SECRET,
      {
        expiresIn: "900s",
      }
    );
    res
      .status(200)
      .set({ acsesstoken: acsessToken })
      .json({ acsessToken: acsessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
