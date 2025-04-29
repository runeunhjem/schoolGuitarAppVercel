var express = require("express");
var router = express.Router();
var db = require("../models");
var PopulateService = require("../services/PopulationService");
var populateService = new PopulateService(db);

// Populate DB
router.post("/", async function (req, res, next) {
  try {
    await populateService.populateDatabase();
    res.status(200).json({ success: true, message: "Database populated successfully." });
  } catch (error) {
    console.error("Error populating database:", error);
    res.status(500).json({ success: false, message: "Failed to populate database.", error: error.message });
  }
});

module.exports = router;
