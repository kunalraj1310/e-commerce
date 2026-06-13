const userModel = require("../models/user.model");

async function userAuthorisation(req, res, next) {
    try {
        if (!req.cookies.token) {
            req.flash("error", "Not authorised");
            return res.redirect("/login");
        }

        const findUser = await userModel.findById(req.params.id);
        const user = await userModel.findOne({ email: req.user.email });

        if (!findUser || !user) {
            req.flash("error", "User not found");
            return res.redirect("/shop");
        }

        if (findUser._id.equals(user._id)) {
            return next();
        }

        req.flash("error", "Not authorised");
        return res.redirect("/shop");

    } catch (err) {
        console.log(err);
        return res.redirect("/shop");
    }
}

module.exports = userAuthorisation;