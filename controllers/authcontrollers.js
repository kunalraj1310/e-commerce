const userSchema = require('../models/user.model');
const generateToken = require('../config/generate-token');
const bcrypt = require('bcrypt');


async function registerUser(req, res) {
    try {
        const finduser = await userSchema.findOne({
            email: req.body.email
        });

        if (finduser) {
            res.flash("error", "Already Registered Please Login");
            return res.redirect('/login');
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        const user = await userSchema.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hash
        });

        const token = generateToken(user);

        res.cookie("token", token);

        res.redirect('/shop');

    } catch (error) {
        res.send(error.message);
    }
}

async function loginUser(req, res) {
    try {
        const user = await userSchema.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.flash('error' ,"Invalid email or password");
        }

        const passVerification = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passVerification) {
            return res.flash('error',"Invalid email or password");
        }

        const token = generateToken(user);

        res.cookie("token", token);

        res.redirect('/shop');

    } catch (error) {
        res.send(error.message);
    }
}

async function logout(req, res) {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    registerUser,
    loginUser,
    logout
};