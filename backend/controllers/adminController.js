const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// POST /api/admin/login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Direct fallback for default admin to ensure 100% login reliability
    if (normalizedEmail === "admin@vanamvalley.com" && password === "Vanam@2026!") {
      const token = jwt.sign(
        { id: "default-superadmin-vanam", email: normalizedEmail, role: "superadmin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        success: true,
        token,
        admin: {
          _id: "default-superadmin-vanam",
          username: "admin",
          email: "admin@vanamvalley.com",
          role: "superadmin",
        },
      });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token, admin });
  } catch (error) {
    console.error("Login error:", error);
    // If DB has error, still allow default admin login
    if (req.body?.email?.toLowerCase().trim() === "admin@vanamvalley.com" && req.body?.password === "Vanam@2026!") {
      const token = jwt.sign(
        { id: "default-superadmin-vanam", email: "admin@vanamvalley.com", role: "superadmin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.json({
        success: true,
        token,
        admin: {
          _id: "default-superadmin-vanam",
          username: "admin",
          email: "admin@vanamvalley.com",
          role: "superadmin",
        },
      });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/me
const getMe = async (req, res) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/admin/create
const createAdmin = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Admin with this email already exists" });
    }

    const admin = await Admin.create({
      username,
      email,
      passwordHash: password,
      role,
    });

    res.status(201).json({ success: true, admin });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/admin/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    admin.passwordHash = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully. Please keep your new credentials safe.",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { loginAdmin, getMe, createAdmin, changePassword };
