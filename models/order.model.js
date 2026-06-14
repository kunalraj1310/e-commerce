const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    address: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    });

module.exports = mongoose.model("order",orderSchema)