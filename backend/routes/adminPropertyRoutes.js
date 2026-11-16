const express = require("express");
const router = express.Router();
const { getAllPropertiesAdmin } = require("../controllers/propertyController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getAllPropertiesAdmin);

module.exports = router;
