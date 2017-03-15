"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
router.get('/', (req, res, next) => {
    res.render('admin/index', {});
    next();
}).post('/', (req, res, next) => {
    // req.
    res.render('index');
});
module.exports = router;
