const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId).lean();
    if (!foundUser) {
      return res.status(404).json({ error: "Invalid user." });
    }
    req.user = foundUser;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}

async function authorize(req, res, next) {
  try {
    const user = await User.findById(req.user._id).lean();

    if (!user) {
      return res.status(404).json({ error: "Invalid user." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Authorization check failed." });
  }
}

module.exports = {
  authenticate,
  authorize,
};
