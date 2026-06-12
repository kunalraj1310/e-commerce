const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
        }
    },

    limits: {
        fileSize:  7* 1024 * 1024 // 7 MB
    }
});

module.exports = upload;