const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware para verificar si el usuario está autenticado
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos el userId en req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}

// Middleware para permitir solo administradores
async function authorize(req, res, next) {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
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
