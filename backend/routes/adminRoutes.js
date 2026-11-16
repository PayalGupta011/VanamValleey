const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getMe,
  createAdmin,
  changePassword,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");

router.post("/login", loginAdmin);
router.get("/me", authMiddleware, getMe);
router.post("/create", authMiddleware, createAdmin);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
