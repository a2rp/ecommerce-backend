const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit"); // ✅ Import built-in

const createRateLimiter = (options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || 15 * 60 * 1000,
        max: options.max || 50,
        message: {
            success: false,
            message: "Too many requests from your IP. Please try again later.",
        },
        keyGenerator: (req, res) => {
            return `${ipKeyGenerator(req)}-${req.originalUrl}`; // ✅ combine IP + route
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

module.exports = createRateLimiter;
