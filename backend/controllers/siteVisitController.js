const SiteVisit = require("../models/SiteVisit");

// In-memory fallback cache if DB is temporarily connecting
const memorySiteVisits = [];

// @desc    Book a new site visit appointment
// @route   POST /api/site-visits
// @access  Public
exports.createSiteVisit = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      propertyInterested,
      preferredDate,
      preferredSlot,
      transportAssistance,
      visitorsCount,
      notes,
    } = req.body;

    if (!name || !phone || !preferredDate) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number and preferred date are required.",
      });
    }

    try {
      const siteVisit = await SiteVisit.create({
        name,
        phone,
        email: email || "",
        propertyInterested: propertyInterested || "Vanam Valley Township (All Options)",
        preferredDate,
        preferredSlot: preferredSlot || "Morning Slot (10:00 AM – 12:30 PM)",
        transportAssistance: transportAssistance || "Self Vehicle / Personal Transport",
        visitorsCount: visitorsCount ? Number(visitorsCount) : 2,
        notes: notes || "",
        status: "pending",
      });

      return res.status(201).json({
        success: true,
        message: "VIP Site Visit appointment booked successfully! Our concierge will call you to confirm.",
        siteVisit,
      });
    } catch (dbErr) {
      console.warn("DB offline, saving site visit to memory:", dbErr.message);
      const mockVisit = {
        _id: "mem-" + Date.now(),
        name,
        phone,
        email: email || "",
        propertyInterested: propertyInterested || "Vanam Valley Township (All Options)",
        preferredDate,
        preferredSlot: preferredSlot || "Morning Slot (10:00 AM – 12:30 PM)",
        transportAssistance: transportAssistance || "Self Vehicle / Personal Transport",
        visitorsCount: visitorsCount ? Number(visitorsCount) : 2,
        notes: notes || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      memorySiteVisits.unshift(mockVisit);
      return res.status(201).json({
        success: true,
        message: "VIP Site Visit appointment booked successfully! Our concierge will call you to confirm.",
        siteVisit: mockVisit,
      });
    }
  } catch (error) {
    console.error("Create site visit error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to book site visit appointment.",
    });
  }
};

// @desc    Get all site visit appointments (Admin)
// @route   GET /api/site-visits
// @access  Private/Admin
exports.getSiteVisits = async (req, res) => {
  try {
    const { status, date, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }
    if (date) {
      filter.preferredDate = date;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { propertyInterested: { $regex: search, $options: "i" } },
      ];
    }

    try {
      const total = await SiteVisit.countDocuments(filter);
      const siteVisits = await SiteVisit.find(filter)
        .sort({ preferredDate: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

      return res.json({
        success: true,
        siteVisits,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      });
    } catch (dbErr) {
      console.warn("DB offline, returning in-memory site visits:", dbErr.message);
      return res.json({
        success: true,
        siteVisits: memorySiteVisits,
        total: memorySiteVisits.length,
        page: 1,
        pages: 1,
      });
    }
  } catch (error) {
    console.error("Get site visits error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve site visits.",
    });
  }
};

// @desc    Update site visit appointment status / notes
// @route   PATCH /api/site-visits/:id
// @access  Private/Admin
exports.updateSiteVisit = async (req, res) => {
  try {
    const { status, notes, preferredDate, preferredSlot } = req.body;
    const update = {};
    if (status) update.status = status;
    if (notes !== undefined) update.notes = notes;
    if (preferredDate) update.preferredDate = preferredDate;
    if (preferredSlot) update.preferredSlot = preferredSlot;

    const siteVisit = await SiteVisit.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!siteVisit) {
      return res.status(400).json({
        success: false,
        message: "Site visit appointment not found.",
      });
    }

    res.json({
      success: true,
      message: "Site visit appointment updated successfully.",
      siteVisit,
    });
  } catch (error) {
    console.error("Update site visit error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update site visit appointment.",
    });
  }
};

// @desc    Delete site visit appointment
// @route   DELETE /api/site-visits/:id
// @access  Private/Admin
exports.deleteSiteVisit = async (req, res) => {
  try {
    const siteVisit = await SiteVisit.findByIdAndDelete(req.params.id);
    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: "Site visit appointment not found.",
      });
    }

    res.json({
      success: true,
      message: "Site visit appointment removed successfully.",
    });
  } catch (error) {
    console.error("Delete site visit error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete site visit appointment.",
    });
  }
};

