// backend/src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide product name"],
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: [true, "Please provide product price"],
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String, // base64 or URL
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
