"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
module.exports = router;
