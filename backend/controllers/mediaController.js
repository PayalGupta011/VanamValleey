const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const Media = require("../models/Media");

const isCloudinaryConfigured = () => {
  const name = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return (
    name &&
    name !== "placeholder" &&
    key &&
    key !== "placeholder" &&
    secret &&
    secret !== "placeholder"
  );
};

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vanam-valley", resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    const Readable = require("stream").Readable;
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

const saveLocally = async (file, category, alt) => {
  const uploadsDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(file.originalname) || ".jpg";
  const safeName = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
  const filePath = path.join(uploadsDir, safeName);

  fs.writeFileSync(filePath, file.buffer);

  // Also copy to frontend/public/uploads if exists so both dev and build pick it up instantly
  try {
    const frontendPublicUploads = path.join(__dirname, "..", "..", "frontend", "public", "uploads");
    if (!fs.existsSync(frontendPublicUploads)) {
      fs.mkdirSync(frontendPublicUploads, { recursive: true });
    }
    fs.writeFileSync(path.join(frontendPublicUploads, safeName), file.buffer);
  } catch (err) {
    // Ignore frontend copy error
  }

  const media = await Media.create({
    url: `/uploads/${safeName}`,
    publicId: `local_${safeName}`,
    width: 1200,
    height: 800,
    format: ext.replace(".", "") || "jpg",
    bytes: file.size || file.buffer.length,
    category: category || "other",
    alt: alt || file.originalname || "Vanam Valley Media",
  });

  return media;
};

// POST /api/media/upload (protected)
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (isCloudinaryConfigured()) {
      try {
        const result = await streamUpload(req.file.buffer);
        const media = await Media.create({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          category: req.body.category || "other",
          alt: req.body.alt || "",
        });
        return res.status(201).json({ success: true, media });
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to local disk storage:", cloudErr.message);
      }
    }

    // Local disk storage fallback (zero external setup required)
    const media = await saveLocally(req.file, req.body.category, req.body.alt);
    return res.status(201).json({ success: true, media });
  } catch (error) {
    console.error("Upload media error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Upload failed",
    });
  }
};

// GET /api/media (protected)
const getMedia = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (category) filter.category = category;

    const total = await Media.countDocuments(filter);
    const media = await Media.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      media,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Get media error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/media/:id (protected)
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res
        .status(404)
        .json({ success: false, message: "Media not found" });
    }

    if (media.publicId && !media.publicId.startsWith("local_")) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (e) {
        console.warn("Cloudinary delete error:", e.message);
      }
    } else if (media.publicId && media.publicId.startsWith("local_")) {
      const fileName = media.publicId.replace("local_", "");
      const filePath = path.join(__dirname, "..", "uploads", fileName);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (_) {}
      }
    }

    await Media.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Media deleted" });
  } catch (error) {
    console.error("Delete media error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadMedia, getMedia, deleteMedia };
