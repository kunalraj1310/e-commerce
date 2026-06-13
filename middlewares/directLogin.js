const jwt = require("jsonwebtoken");

function directLogin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);

        if (decoded) {
            return res.redirect("/shop");
        }

        next();
    } catch (err) {
        next();
    }
}

module.exports = directLogin;