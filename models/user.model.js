const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

    contact: {
        type: Number
    },

    orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "order"
        }],

    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            default: 1
         }}],

    profilepic: {
        type: Buffer
    }
});

module.exports = mongoose.model("user", userSchema);