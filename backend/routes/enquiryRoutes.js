const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const authMiddleware = require("../middleware/auth");

router.post("/", createEnquiry);
router.get("/", authMiddleware, getEnquiries);
router.put("/:id", authMiddleware, updateEnquiry);
router.delete("/:id", authMiddleware, deleteEnquiry);

module.exports = router;
