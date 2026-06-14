const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const userAuthorisation = require('../middlewares/userAuthorisation');
const userModel = require("../models/user.model");
const orderModel = require("../models/order.model");

router.get("/checkout/:id",isLoggedIn, userAuthorisation , async (req, res) => {
    const user = await userModel
    .findOne({email:req.user.email})
    .populate('cart.product')
    const total = user.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
    }, 0);

    let shipping = 100
    if(total < 4000){
        shipping = Math.round(total/40)
    }else{
        shipping = 0
    }
    const tax = Math.round(total*0.18)

    res.render("checkout",{user,total,shipping,tax});
});
router.post("/order/:id",isLoggedIn,userAuthorisation,async (req,res)=>{
    const user = await userModel
    .findOne({_id: req.params.id})
    .populate('cart.product')

    if (user.cart.length === 0) {
    return req.flash('error','Your Cart Is Empty');
    }else{
    const total = user.cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
    }, 0);

    let shipping = 100
    if(total < 4000){
        shipping = Math.round(total/40)
    }else{
        shipping = 0
    }
    const tax = Math.round(total*0.18)

    const sumTotal = (total + shipping + tax) - 500

    const address = `${req.body.address} ,${req.body.city} , ${req.body.pinCode} , phone : ${req.body.phone}`

    const order = await orderModel.create({
        user:user._id,
        address: address,
        totalAmount: sumTotal,
        products: user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity
    }))
    })
    console.log(order._id)
    user.cart = []
    user.orders.push(order._id)
    await user.save()
    res.render("orderConfirmation",{order})
}
})
module.exports = router;