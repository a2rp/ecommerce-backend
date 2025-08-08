require("dotenv").config(); // Load env vars

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();

// routes
app.use("/api/products", require("./src/routes/product.routes"));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
