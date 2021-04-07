const jwt = require("jsonwebtoken");

module.exports.checkToken = function (req, res, next) {
  const acsesstoken = req.headers["acsesstoken"];
  if (acsesstoken == null) {
    return res.sendStatus(401);
  }
  try {
    const user = jwt.verify(acsesstoken, process.env.ACSESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
