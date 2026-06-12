const express = require('express');
const {
    registerUser,
    loginUser,
    logout
} = require('../controllers/authcontrollers');

const route = express.Router();

route.get("/register", (req, res) => {
    res.render("register");
});

route.get("/login", (req, res) => {
    res.render("login");
});

route.get("/logout", logout);

route.post("/register", registerUser);
route.post("/login", loginUser);

module.exports = route;