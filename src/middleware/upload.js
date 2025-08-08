// // const multer = require("multer");
// // const path = require("path");

// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, "uploads/");
// //     },
// //     filename: function (req, file, cb) {
// //         const uniqueName = `${Date.now()}-${file.originalname}`;
// //         cb(null, uniqueName);
// //     },
// // });

// // const fileFilter = (req, file, cb) => {
// //     const allowed = [
// //         "image/jpeg",
// //         "image/jpg",
// //         "image/png",
// //         "image/webp",
// //         "image/avif",
// //     ];
// //     if (allowed.includes(file.mimetype)) {
// //         cb(null, true);
// //     } else {
// //         cb(new Error("Only image files are allowed"));
// //     }
// // };

// // const upload = multer({
// //     storage: storage,
// //     limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
// //     fileFilter,
// // });

// // module.exports = upload;

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "ecommerce-products",
//         allowed_formats: ["jpg", "jpeg", "png", "webp"],
//     },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommerce-products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"], // Cloudinary format restriction
    },
});

// Allowed MIME types for validation before upload
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

// Filter image MIME types
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("❌ Only JPG, PNG, or WEBP images are allowed"));
    }
};

// Limit file size to 5MB (optional but recommended)
const limits = {
    fileSize: 5 * 1024 * 1024, // 5MB
};

// Final multer setup
const upload = multer({
    storage,
    fileFilter,
    limits,
});

module.exports = upload;
