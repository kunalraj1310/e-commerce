async function ownerAuthorisation(params) {
    
    const check = await ownerModel.findOne({
        email: req.user.email
    });

    if (check) {
        next()
    }

    req.flash("error", "You can't access this page");
    res.redirect("/login");

}

module.exports = ownerAuthorisation