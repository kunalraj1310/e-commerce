const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user.model');
const router = express.Router();
const userAuthorisation = require('../middlewares/userAuthorisation')

router.post('/product/:id',isLoggedIn,async(req,res)=>{

   const user =  await userModel.findOne({email:req.user.email})
   
   const find = user.cart.includes(req.params.id)

   if(!find){
    user.cart.push({product: req.params.id})
   await user.save()
    req.flash("success"," Product added successfully")
   res.redirect("/shop")

   }else{
    req.flash("error"," Product already added  ")
    res.redirect("/shop")
   }
   
})

router.get("/cart/:id",isLoggedIn,userAuthorisation,async (req,res)=>{

    const user = await userModel
    .findOne({email:req.user.email})
    .populate('cart.product')
    // console.log(user.cart)

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
    // const total = 2000
    // const shipping = 1000
    // const tax = 18 
    res.render("cart",{user,total,shipping,tax})
})

router.post("/decrease/:id", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({
        email: req.user.email
    });
    const id = req.params.id
    const cartItem = user.cart.find((item)=>{
        item._id === id
        return item._id
});

    if (cartItem.quantity === 1) {
        user.cart.pull(cartItem._id);
    } else {
        cartItem.quantity -= 1;
    }
    await user.save();
    res.redirect(`/cart/${user._id}`);
});

router.post("/increase/:id", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({
        email: req.user.email
    }); 
    const id = req.params.id
    
    let cartItem = user.cart.find((item)=>{
        item._id === id
        return item._id
    })
    cartItem.quantity += 1
    await user.save();
    res.redirect(`/cart/${user._id}`);
});

module.exports = router