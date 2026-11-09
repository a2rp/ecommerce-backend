// backend/src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide product name"],
            trim: true,
            maxlength: 120,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
        price: {
            type: Number,
            required: [true, "Please provide product price"],
            min: [0, "Product price cannot be negative"],
        },
        category: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
