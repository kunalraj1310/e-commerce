const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const route = express.Router()

route.get("/shop",isLoggedIn,async (req,res)=>{
    const user = await userModel.findOne({email:req.user.email})
    const products = await productModel.find()
    res.render("shop",{user,products,})
})
module.exports = route