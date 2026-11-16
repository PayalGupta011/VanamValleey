const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
    },
    alt: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "villas",
        "architecture",
        "interiors",
        "landscapes",
        "amenities",
        "lifestyle",
        "hero",
        "gallery",
        "other",
      ],
      default: "other",
    },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    format: { type: String, default: "" },
    bytes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

mediaSchema.index({ category: 1 });

module.exports = mongoose.model("Media", mediaSchema);

