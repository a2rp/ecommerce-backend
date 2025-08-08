const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        // 🛡️ Validate fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        // ✅ Get Cloudinary image URL
        const imagePath = req.file.path;

        const product = new Product({
            name,
            description,
            price,
            category,
            image: imagePath, // stored as cloudinary URL
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (err) {
        console.log("Backend Error:", err.message);
        return res.status(500).json({
            success: false,
            message:
                err.message.includes("Only JPG") ||
                err.message.includes("File too large")
                    ? err.message
                    : "Internal Server Error",
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
};
