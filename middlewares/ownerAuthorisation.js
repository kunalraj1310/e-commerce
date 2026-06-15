const ownerModel = require("../models/owner.model");

async function ownerAuthorisation(req, res, next) {

    const check = await ownerModel.findOne({
        _id: req.user.id
    });

    if (check) {
        return next();
    }

    req.flash("error", "You can't access this page");
    return res.redirect("/login");
}

module.exports = ownerAuthorisation;