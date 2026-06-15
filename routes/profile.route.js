const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user.model');
const router = express.Router()
const upload = require('../config/multer-config')
const userAuthorisation = require('../middlewares/userAuthorisation')
const ownerModel = require('../models/owner.model')

router.get("/profile/:id",isLoggedIn,userAuthorisation,async (req,res)=>{
    const user = await userModel.findOne({ email: req.user.email });
    const isOwner = await ownerModel.findOne({_id:req.params.id})
    let userRole;
    if(isOwner){
         userRole = 'admin'
    }
    res.render('profile',{user , userRole})
})

router.get("/profile/upload/:id",isLoggedIn,userAuthorisation,async (req,res)=>{
    const user = await userModel.findOne({email:req.user.email})
    res.render("uploadPic",{user})
})

router.post("/profile/upload/:id",isLoggedIn,upload.single('profilePic'),async(req,res)=>{
    const user = await userModel.findOneAndUpdate({email:req.user.email},{profilepic: req.file.buffer})
    res.redirect(`/profile/${user._id}`)
})

module.exports = router