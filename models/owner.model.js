const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("owner", ownerSchema);