const express = require("express");
const ownerModel = require("../models/owner.model");
const bcrypt = require("bcrypt");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const upload = require("../config/multer-config");
const router = express.Router();
const ownerAuthorisation = require('../middlewares/ownerAuthorisation')

router.post("/owner", async (req, res) => {
    if (process.env.NODE_ENV !== "development") {
        return res.send("You are not authorized to create an owner.");
    }

    try {
        const owner = await ownerModel.findOne();

        if (owner) {
            return res.send("No owner could be created. Owner already exists.");
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        await ownerModel.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hash
        });

        return res.send("Owner created successfully.");
    } catch (error) {
        return res.send(error.message);
    }
});

router.get('/owner/admin', isLoggedIn,ownerAuthorisation, async (req, res) => {
    return res.render("admin");
});

router.post('/products/Create',isLoggedIn,ownerAuthorisation, upload.single("image"),async (req, res) => {
        const owner = await ownerModel.findOne({email:req.user.email})

        try {

            const product = await productModel.create({
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discountPrice,
                image: req.file.buffer
            });
            res.redirect("/owner/admin");
            owner.products.push(product._id)
            await owner.save()

        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
);

module.exports = router;