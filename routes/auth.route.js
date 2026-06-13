const express = require('express');
const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/authcontrollers');

const route = express.Router();
const directLogin = require('../middlewares/directLogin')

route.get("/register",directLogin, (req, res) => {
    res.render("register");
});

route.get("/login",directLogin, (req, res) => {
    res.render("login");
});

route.get("/logout", logout);

route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = route;