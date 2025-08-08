const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "Image is required" });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const product = new Product({
            name,
            description,
            price,
            category,
            image: imagePath,
        });
        await product.save();

        res.status(201).json({ success: true, product });
    } catch (err) {
        console.log("Backend Error:", err.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
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

// ✅ Export as object
module.exports = {
    createProduct,
    getAllProducts,
};
