const Purchase = require("../models/purchase");
const User = require("../models/user");
const Listing = require("../models/listing");

// Create a new purchase record
module.exports.createPurchase = async (req, res) => {
    try {
        const { listingId, amount, paymentId, orderId, quantity = 1 } = req.body;
        const userId = req.user._id;

        // Verify the listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }

        // Create purchase record
        const purchase = new Purchase({
            user: userId,
            listing: listingId,
            amount: amount,
            paymentId: paymentId,
            orderId: orderId,
            quantity: quantity,
            status: 'completed'
        });

        await purchase.save();

        // Add purchase to user's purchases array
        await User.findByIdAndUpdate(userId, {
            $push: { purchases: purchase._id }
        });

        res.json({ 
            success: true, 
            purchase: purchase,
            message: "Purchase recorded successfully" 
        });

    } catch (error) {
        console.error("Error creating purchase:", error);
        res.status(500).json({ error: "Failed to create purchase record" });
    }
};

// Get user's purchase history
module.exports.getUserPurchases = async (req, res) => {
    try {
        const userId = req.user._id;
        const purchases = await Purchase.find({ user: userId })
            .populate('listing')
            .sort({ purchaseDate: -1 });

        res.json(purchases);
    } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ error: "Failed to fetch purchase history" });
    }
};

// Get purchase by ID
module.exports.getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id)
            .populate('listing')
            .populate('user', 'username email');

        if (!purchase) {
            return res.status(404).json({ error: "Purchase not found" });
        }

        res.json(purchase);
    } catch (error) {
        console.error("Error fetching purchase:", error);
        res.status(500).json({ error: "Failed to fetch purchase details" });
    }
};

// Update purchase status
module.exports.updatePurchaseStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const purchase = await Purchase.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );

        if (!purchase) {
            return res.status(404).json({ error: "Purchase not found" });
        }

        res.json({ 
            success: true, 
            purchase: purchase,
            message: "Purchase status updated successfully" 
        });
    } catch (error) {
        console.error("Error updating purchase status:", error);
        res.status(500).json({ error: "Failed to update purchase status" });
    }
};

// Get user's purchase statistics
module.exports.getPurchaseStats = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const stats = await Purchase.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: null,
                    totalPurchases: { $sum: 1 },
                    totalAmount: { $sum: "$amount" },
                    completedPurchases: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    }
                }
            }
        ]);

        const result = stats.length > 0 ? stats[0] : {
            totalPurchases: 0,
            totalAmount: 0,
            completedPurchases: 0
        };

        res.json(result);
    } catch (error) {
        console.error("Error fetching purchase stats:", error);
        res.status(500).json({ error: "Failed to fetch purchase statistics" });
    }
}; 