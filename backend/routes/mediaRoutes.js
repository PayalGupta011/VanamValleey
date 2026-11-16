const express = require("express");
const router = express.Router();
const { uploadMedia, getMedia, deleteMedia } = require("../controllers/mediaController");
const authMiddleware = require("../middleware/auth");
const upload = require("../config/multer");

router.post("/upload", authMiddleware, upload.single("image"), uploadMedia);
router.get("/", authMiddleware, getMedia);
router.delete("/:id", authMiddleware, deleteMedia);

module.exports = router;
