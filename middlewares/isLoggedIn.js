const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
       req.flash("error", "You HAVE TO LOGIN FIRST");
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        const user = await userModel
        .findOne({email:decoded.email})
        .select('-password')
        req.user = user;
        next();
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = isLoggedIn;