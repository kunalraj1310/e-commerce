const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')
const userAuthorisation = require('../middlewares/userAuthorisation');
const userModel = require("../models/user.model");

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
router.post("/order/:id",isLoggedIn,userAuthorisation,(req,res)=>{
    
})

module.exports = router;