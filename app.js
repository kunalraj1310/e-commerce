const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const db = require("./config/mongoose-config");
const indexRouter = require("./routes/index.route");
const authRouter = require("./routes/auth.route");
const createOwner = require("./routes/owner.route")
const profile = require("./routes/profile.route")
const cart = require("./routes/cart.route")
const checkout = require('./routes/checkout.route')
const shop = require("./routes/shop.route")
const orderView = require('./routes/orderView.route')
const session = require("express-session");
const flash = require("connect-flash");

app.use(
    session({
        secret:"mysecret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", createOwner);
app.use("/",shop)
app.use("/",cart)
app.use("/",checkout)
app.use("/",profile)
app.use("/",orderView)
module.exports = app;