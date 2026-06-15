const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');

const route = express.Router();

route.get('/shop', isLoggedIn, async (req, res) => {

    const user = await userModel.findOne({
        email: req.user.email
    });

    const filter = {};

    // Search
    if (req.query.query?.trim()) {

        const escapedQuery = req.query.query
            .trim()
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const words = escapedQuery
            .split(/\s+/)
            .filter(Boolean);

        filter.$and = words.map(word => ({
            name: {
                $regex: word,
                $options: 'i'
            }
        }));
    }

    // In Stock Filter
    if (req.query.instock === 'true') {
        filter.stock = 'Instock';
    }

    // Discount Filter
    if (req.query.discounted === 'true') {
        filter.discount = { $gt: 0 };
    }

    const products = await productModel.find(filter);

    res.render('shop', {
        user,
        products,
        searchQuery: req.query.query || '',
        instock: req.query.instock === 'true',
        discounted: req.query.discounted === 'true'
    });
});

route.get('/outofstock', isLoggedIn, (req, res) => {
    req.flash('error', 'Out Of Stock');
    res.redirect('/shop');
});

module.exports = route;