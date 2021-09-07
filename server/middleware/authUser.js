require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "Authorization required" });
  }
};
