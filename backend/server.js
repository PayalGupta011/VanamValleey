const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const adminPropertyRoutes = require("./routes/adminPropertyRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const siteVisitRoutes = require("./routes/siteVisitRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

// Dynamic CORS configuration for local and cloud deployment (Netlify, Render, Vercel)
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((s) => s.trim().replace(/\/+$/, ""))
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/+$/, "");

      if (
        allowedOrigins.length === 0 ||
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(normalizedOrigin) ||
        normalizedOrigin.endsWith(".netlify.app") ||
        normalizedOrigin.endsWith(".vercel.app") ||
        normalizedOrigin.includes("localhost") ||
        normalizedOrigin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback permissive so API never blocks front-end unexpectedly
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Ensure uploads folder exists and serve static uploads
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vanam Valley API is running",
    version: "1.0.0",
  });
});

// API Routes (Mounted on both /api/* and direct /* for maximum deployment resilience)
const registerAppRoutes = (prefix = "") => {
  app.use(`${prefix}/admin/properties`, adminPropertyRoutes);
  app.use(`${prefix}/admin`, adminRoutes);
  app.use(`${prefix}/properties`, propertyRoutes);
  app.use(`${prefix}/enquiries`, enquiryRoutes);
  app.use(`${prefix}/site-visits`, siteVisitRoutes);
  app.use(`${prefix}/settings`, settingsRoutes);
  app.use(`${prefix}/media`, mediaRoutes);
};

registerAppRoutes("/api");
registerAppRoutes(""); // Fallback in case frontend requests without /api prefix

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
