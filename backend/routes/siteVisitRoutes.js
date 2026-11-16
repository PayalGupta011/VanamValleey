const express = require("express");
const router = express.Router();
const {
  createSiteVisit,
  getSiteVisits,
  updateSiteVisit,
  deleteSiteVisit,
} = require("../controllers/siteVisitController");
const authMiddleware = require("../middleware/auth");

router.post("/", createSiteVisit);
router.get("/", authMiddleware, getSiteVisits);
router.patch("/:id", authMiddleware, updateSiteVisit);
router.delete("/:id", authMiddleware, deleteSiteVisit);

module.exports = router;
