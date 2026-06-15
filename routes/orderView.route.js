const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const userAuthorisation = require('../middlewares/userAuthorisation');
const userModel = require("../models/user.model");
const orderModel = require("../models/order.model");
const productSchema = require('../models/product.model')

router.get('/orders/:id',isLoggedIn , userAuthorisation, async (req,res)=>{
    const user = await userModel
    .findOne({email:req.user.email})
    .populate({
        path: "orders",
        populate: {
            path: "products.product"
        }
    })

    // user.orders.forEach(product => {
    //      console.log(product.products)   
    // })
    // const productIds = user.orders.flatMap(order =>
    // order.products.map(item => item.product)
    // );
    // const productQunatity = user.orders.flatMap(order =>
    // order.products.map(item => item.qunatity)
    // );
    // const products = await productSchema.find({
    //     _id: { $in: productIds }
    // });

    res.render("orderView",{user})
})

module.exports = router