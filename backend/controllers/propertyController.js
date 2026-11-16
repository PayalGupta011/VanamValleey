const Property = require("../models/Property");

// GET /api/properties (public)
const getProperties = async (req, res) => {
  try {
    const { type, propertyType, status, featured, page = 1, limit = 12 } = req.query;
    const filter = { isPublished: true };

    const selectedType = propertyType || type;
    if (selectedType) filter.propertyType = selectedType;
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured === "true";

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments(filter);
    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      properties,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Get properties error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/properties/:slug (public)
const getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.json({ success: true, property });
  } catch (error) {
    console.error("Get property by slug error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/properties (protected)
const getAllPropertiesAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Property.countDocuments();
    const properties = await Property.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      properties,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Get all properties admin error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/properties (protected)
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, property });
  } catch (error) {
    console.error("Create property error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/properties/:id (protected)
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.json({ success: true, property });
  } catch (error) {
    console.error("Update property error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/properties/:id (protected)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.json({ success: true, message: "Property deleted" });
  } catch (error) {
    console.error("Delete property error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getProperties,
  getPropertyBySlug,
  getAllPropertiesAdmin,
  createProperty,
  updateProperty,
  deleteProperty,
};
