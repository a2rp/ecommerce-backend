require("dotenv").config(); // Load env vars

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://ecommerce-mern-store.netlify.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin); // ✅ return the origin itself, not true
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // ✅ REQUIRED when using cookies or withCredentials
    })
);

app.use(express.json()); // For parsing JSON
app.use(express.json({ limit: "10mb" }));

// Connect to MongoDB
connectDB();

// routes
app.use("/api/products", require("./src/routes/product.routes"));
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Centralized Error Handler
app.use((err, req, res, next) => {
    // Handle CORS error
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({ message: "Blocked by CORS policy" });
    }

    // Handle Multer file size error
    if (err.name === "MulterError" && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image must be less than 5MB" });
    }

    // Handle Invalid File Type (MIME)
    if (
        err.message.includes("Only JPG") ||
        err.message.includes("Only PNG") ||
        err.message.includes("Only WEBP")
    ) {
        return res.status(400).json({ message: err.message });
    }

    // Fallback for all other errors
    console.error("Unhandled Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
