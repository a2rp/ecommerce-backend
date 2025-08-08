const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
    createProduct,
    getAllProducts,
} = require("../controllers/product.controller");

router.post("/", upload.single("image"), createProduct); // Accept image from FormData
router.get("/", getAllProducts);

module.exports = router;
