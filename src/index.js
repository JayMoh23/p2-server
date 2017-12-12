"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./config/db/index");
const axios = require("axios");
const utils_1 = require("./middleware/utils");
var exp = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const app = express();
const apiKey = 'RrgYj2_KwycE8D9-H3B6P1QuWGLSy1Cloc5RtWwVzvl_pt0_4QUO8VJv7y1KjItWOmQccm9_ZaWqwislMaZkxCJiIQQEr5FXsYK3A3uBaw_l-5so2fOLyoF2PbguWnYx';
// GET all dishes
app.get('/db/dishes', (req, res, next) => {
    index_1.procedure("spGetDishes")
        .then((dishes) => {
        res.json(dishes[0]);
    });
});
//GET one dish
app.get('/db/dishes/:id', (req, res, next) => {
    index_1.procedure("spGetDish")
        .then((dish) => {
        res.json(dish[0]);
    });
});
//  GET results from terms searched in Yelp API
app.get('/restaurants', (req, res, next) => {
    axios.default.get(utils_1.formatYelpSearchUrl(req.query.term), {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then((results) => {
        res.send(results.data);
    });
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});
