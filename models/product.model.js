const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discount:{
        type:Number,
        default: 0
    },
    date:{
        type:Date,
        default :Date.now()
    },
    stock:{
        type:String,
        default:"Instock"
    }
})

module.exports = mongoose.model("product",productSchema)