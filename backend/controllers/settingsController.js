const WebsiteSettings = require("../models/WebsiteSettings");

// GET /api/settings (public)
const getSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne({ siteKey: "main" });

    if (!settings) {
      settings = await WebsiteSettings.create({ siteKey: "main" });
    }

    res.json({ success: true, settings });
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/settings (protected)
const updateSettings = async (req, res) => {
  try {
    const settings = await WebsiteSettings.findOneAndUpdate(
      { siteKey: "main" },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, settings });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getSettings, updateSettings };
