const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchase");
const { isLoggedIn } = require("../middleware.js");

// Create a new purchase (called after successful payment)
router.post("/create", isLoggedIn, purchaseController.createPurchase);

// Get user's purchase history
router.get("/history", isLoggedIn, purchaseController.getUserPurchases);

// Get specific purchase details
router.get("/:id", isLoggedIn, purchaseController.getPurchaseById);

// Update purchase status (admin only)
router.patch("/:id/status", isLoggedIn, purchaseController.updatePurchaseStatus);

// Get user's purchase statistics
router.get("/stats", isLoggedIn, purchaseController.getPurchaseStats);

module.exports = router; 