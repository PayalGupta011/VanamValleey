const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id === "default-superadmin-vanam") {
      req.admin = {
        _id: "default-superadmin-vanam",
        username: "admin",
        email: "admin@vanamvalley.com",
        role: "superadmin",
      };
      return next();
    }

    try {
      const admin = await Admin.findById(decoded.id).select("-passwordHash");
      if (admin) {
        req.admin = admin;
        return next();
      }
    } catch (dbErr) {
      console.warn("DB lookup in authMiddleware warning:", dbErr.message);
    }

    // Fallback if decoded has admin info
    if (decoded.email === "admin@vanamvalley.com") {
      req.admin = {
        _id: decoded.id || "default-superadmin-vanam",
        username: "admin",
        email: "admin@vanamvalley.com",
        role: "superadmin",
      };
      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Admin not found.",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Authentication error.",
    });
  }
};

module.exports = authMiddleware;

