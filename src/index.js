"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./config/db/index");
const axios = require("axios");
const utils_1 = require("./middleware/utils");
const exp = require('express');
const bp = require('body-parser');
const app = express();
const apiKey = 'RrgYj2_KwycE8D9-H3B6P1QuWGLSy1Cloc5RtWwVzvl_pt0_4QUO8VJv7y1KjItWOmQccm9_ZaWqwislMaZkxCJiIQQEr5FXsYK3A3uBaw_l-5so2fOLyoF2PbguWnYx';
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
/****DISHES ****/
// GET all dishes
app.get('/db/dishes', (req, res, next) => {
    index_1.procedure("spGetDishes")
        .then((dishes) => {
        res.json(dishes[0]);
    });
});
//GET one dish
app.get('/db/dishes/:id', (req, res, next) => {
    index_1.procedure("spGetDish", [+req.params.id])
        .then((dish) => {
        res.json(dish[0][0]);
    });
});
//POST a new dish 
app.post("/db/dishes", (req, res, next) => {
    index_1.procedure("spInsertDish", [req.body.name, req.body.rating, req.body.date, req.body.itsavaliable, req.body.ingredients])
        .then((dish) => {
        return res.json(dish);
    });
});
/****INGREDIENTS ****/
//GET ingredients for one dish
//POST new ingredients for a dish
app.post("/db/ingredients", (req, res, next) => {
    index_1.procedure("spInsertIngredients", [req.body.name])
        .then((i) => {
        return res.json(i);
    });
});
/****RESTAURANTS ****/
//  GET results from terms searched in Yelp API for restaurants in Birmingham
app.get('/db/restaurants', (req, res, next) => {
    axios.default.get(utils_1.formatYelpSearchUrl(req.query.term), {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })
        .then((results) => {
        res.send(results.data);
    });
});
//GET all restaurants (use this call when trying to get all or some saved restaurants)
//DO NOT GET THIS ONE AND THE ABOVE CALL MIXED UP
//P.S. IM NOT YELLING AT YOU JUST MAKING SURE YOU SEE
app.get('/db/savedrestaurants', (req, res, next) => {
    index_1.procedure("spGetRestaurants")
        .then((rest) => {
        res.json(rest[0]);
    });
});
//GET one restaurant (use this call when trying to get saved restaurants)
app.get('/db/restaurants/:id', (req, res, next) => {
    index_1.procedure("spGetRestaurant", [+req.params.id])
        .then((rest) => {
        res.json(rest[0][0]);
    });
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});
