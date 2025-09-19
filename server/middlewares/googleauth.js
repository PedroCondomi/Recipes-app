const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const verifyAuth = async (req, res, next) => {
  const token = req.headers["x-token"] || req.cookies.tmpToken;
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-__v");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: `Invalid or expired token: ${error}` });
  }
};

module.exports = verifyAuth;
