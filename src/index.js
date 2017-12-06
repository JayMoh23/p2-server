"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app
    .use(express.static(path.join(__dirname + '/../dist')))
    .get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});
