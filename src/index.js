"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./config/db/index");
const app = express();
app.get('/*', (req, res) => {
    index_1.procedure("spGetResturants")
        .then((restaurants) => {
        res.json(restaurants[0]);
    });
});
app.get('/:id', (req, res) => {
    index_1.procedure("spGetRestaurant")
        .then((restaurants) => {
        res.json(restaurants[1]);
    });
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});
