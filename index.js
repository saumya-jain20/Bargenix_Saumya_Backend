const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(bodyParser.json());

// Mock Database
let coupons = [];

// Generate Coupon API
app.post("/generate-coupon", (req, res) => {
    const { productId, expiryMinutes } = req.body;

    if (!productId || !expiryMinutes) {
        return res.status(400).json({ error: "productId and expiryMinutes are required" });
    }

    const coupon = {
        id: uuidv4(),
        productId,
        code: `DISCOUNT-${uuidv4().slice(0, 8)}`,
        expiry: new Date(Date.now() + expiryMinutes * 60000).toISOString(),
    };

    coupons.push(coupon);
    res.status(201).json({ message: "Coupon generated", coupon });
});

// Validate Coupon API
app.post("/validate-coupon", (req, res) => {
    const { code, productId, userId } = req.body;

    if (!code || !productId || !userId) {
        return res.status(400).json({ error: "code, productId, and userId are required" });
    }

    const coupon = coupons.find((c) => c.code === code);

    if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.productId !== productId) {
        return res.status(400).json({ error: "Coupon not valid for this product" });
    }

    if (new Date(coupon.expiry) < new Date()) {
        return res.status(400).json({ error: "Coupon has expired" });
    }

    res.status(200).json({ message: "Coupon is valid" });
});

// Log Mock Database
app.get("/coupons", (req, res) => {
    res.status(200).json(coupons);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
