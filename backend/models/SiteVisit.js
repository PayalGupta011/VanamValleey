const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    propertyInterested: {
      type: String,
      default: "Vanam Valley Township (All Options)",
    },
    preferredDate: {
      type: String,
      required: [true, "Visit date is required"],
    },
    preferredSlot: {
      type: String,
      default: "Morning Slot (10:00 AM – 12:30 PM)",
    },
    transportAssistance: {
      type: String,
      enum: ["Free Pick & Drop (Balaghat Station / Wainganga Bypass)", "Self Vehicle / Personal Transport"],
      default: "Self Vehicle / Personal Transport",
    },
    visitorsCount: {
      type: Number,
      default: 2,
      min: 1,
      max: 15,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

siteVisitSchema.index({ status: 1 });
siteVisitSchema.index({ preferredDate: 1 });
siteVisitSchema.index({ createdAt: -1 });

module.exports = mongoose.model("SiteVisit", siteVisitSchema);

