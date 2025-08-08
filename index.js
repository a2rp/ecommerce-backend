require("dotenv").config(); // Load env vars

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");

const app = express();
// ✅ CORS Origin Whitelist
const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://ecommerce-mern-store.netlify.app", // deployed Netlify
    // Add more domains here if needed
];
// ✅ Custom CORS config
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json()); // For parsing JSON
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();

// routes
app.use("/api/products", require("./src/routes/product.routes"));

app.use((err, req, res, next) => {
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({ message: "Blocked by CORS policy" });
    }
    next(err);
});

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
