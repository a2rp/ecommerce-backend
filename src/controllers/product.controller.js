const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const normalizedName = typeof name === "string" ? name.trim() : "";
        const normalizedDescription =
            typeof description === "string" ? description.trim() : "";
        const normalizedCategory =
            typeof category === "string" ? category.trim() : "";
        const numericPrice =
            typeof price === "number"
                ? price
                : typeof price === "string" && price.trim() !== ""
                  ? Number(price.trim())
                  : NaN;

        if (
            !normalizedName ||
            !normalizedDescription ||
            !normalizedCategory ||
            normalizedName.length > 120 ||
            normalizedDescription.length > 5000 ||
            normalizedCategory.length > 80 ||
            !Number.isFinite(numericPrice) ||
            numericPrice < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, description, category, and a valid non-negative price are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const imagePath = req.file.path;

        const product = new Product({
            name: normalizedName,
            description: normalizedDescription,
            price: numericPrice,
            category: normalizedCategory,
            image: imagePath,
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        console.error("Product creation failed:", err);
        return res.status(500).json({
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
        console.error("Product listing failed:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
};
