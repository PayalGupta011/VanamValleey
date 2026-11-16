const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    propertyType: {
      type: String,
      enum: ["villa", "plot", "apartment"],
      required: [true, "Property type is required"],
    },
    configuration: {
      type: String,
      default: "",
      // e.g., "3 BHK", "1200 sq ft plot"
    },
    plotArea: {
      value: { type: Number, default: 0 },
      unit: { type: String, default: "sq ft" },
    },
    builtUpArea: {
      value: { type: Number, default: 0 },
      unit: { type: String, default: "sq ft" },
    },
    price: {
      type: Number,
      default: 0,
    },
    priceDisplay: {
      type: String,
      default: "Price on Request",
    },
    location: {
      area: { type: String, default: "" },
      city: { type: String, default: "Balaghat" },
      state: { type: String, default: "Madhya Pradesh" },
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: "" },
        alt: { type: String, default: "" },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ["available", "sold", "upcoming", "unavailable"],
      default: "available",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    highlights: [
      {
        type: String,
      },
    ],
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title
propertySchema.pre("save", function () {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
});

// Index for common queries
propertySchema.index({ status: 1, isPublished: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ featured: 1 });

module.exports = mongoose.model("Property", propertySchema);

