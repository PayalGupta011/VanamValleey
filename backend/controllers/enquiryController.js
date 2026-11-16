const Enquiry = require("../models/Enquiry");

const memoryEnquiries = [];

// POST /api/enquiries (public)
const createEnquiry = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name, phone, and email are required" });
    }

    try {
      const enquiry = await Enquiry.create(req.body);
      return res.status(201).json({ success: true, enquiry });
    } catch (dbErr) {
      console.warn("DB offline, saving enquiry to memory:", dbErr.message);
      const mockEnq = {
        _id: "mem-enq-" + Date.now(),
        ...req.body,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      memoryEnquiries.unshift(mockEnq);
      return res.status(201).json({ success: true, enquiry: mockEnq });
    }
  } catch (error) {
    console.error("Create enquiry error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/enquiries (protected)
const getEnquiries = async (req, res) => {
  try {
    const { page = 1, limit = 12, status } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (status) filter.status = status;

    try {
      const total = await Enquiry.countDocuments(filter);
      const enquiries = await Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      return res.json({
        success: true,
        enquiries,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      });
    } catch (dbErr) {
      console.warn("DB offline, returning in-memory enquiries:", dbErr.message);
      return res.json({
        success: true,
        enquiries: memoryEnquiries,
        total: memoryEnquiries.length,
        page: 1,
        pages: 1,
      });
    }
  } catch (error) {
    console.error("Get enquiries error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PUT /api/enquiries/:id (protected)
const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    res.json({ success: true, enquiry });
  } catch (error) {
    console.error("Update enquiry error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/enquiries/:id (protected)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });
    }

    res.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiry, deleteEnquiry };
