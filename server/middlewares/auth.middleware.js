// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided. Unauthorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // add JWT_SECRET in .env
    req.user = decoded; // user info (id, role, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token. Unauthorized." });
  }
};

// Extra middleware to check for Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
