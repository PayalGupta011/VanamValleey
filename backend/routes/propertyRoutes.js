const express = require("express");
const router = express.Router();
const {
  getProperties,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const authMiddleware = require("../middleware/auth");

// Public routes
router.get("/", getProperties);
router.get("/:slug", getPropertyBySlug);

// Protected routes
router.post("/", authMiddleware, createProperty);
router.put("/:id", authMiddleware, updateProperty);
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;
