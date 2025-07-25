const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const router = express.Router();

// Check if Razorpay credentials are configured
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file");
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create a Razorpay order
router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;
        
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paisa
            currency: "INR",
            payment_capture: 1,
        });

        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create payment order" });
    }
});

// Route to handle successful payments
router.get("/success", (req, res) => {
    res.render("payment/success.ejs", { 
        message: "Payment Successful! Thank you for your purchase.",
        paymentId: req.query.payment_id || "N/A"
    });
});

// Route to handle payment verification
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Verify the payment signature
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');
        
        if (expectedSignature === razorpay_signature) {
            // Payment is verified
            res.json({ verified: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ verified: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
});

module.exports = router;
