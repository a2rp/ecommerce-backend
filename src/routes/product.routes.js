const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
    createProduct,
    getAllProducts,
} = require("../controllers/product.controller");

const createRateLimiter = require("../middleware/rateLimiter");

// 🛡️ Apply rate limiters
const getLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 100 });
const postLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });

router.get("/", getLimiter, getAllProducts);
router.post("/", postLimiter, upload.single("image"), createProduct); // Accept image from FormData

module.exports = router;
