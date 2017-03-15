"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const models_1 = require("../models");
var router = express.Router();
router.get('/', (req, res, next) => {
    if (req.session.isVisit) {
        req.session.isVisit++;
    }
    else {
        req.session.isVisit = 1;
    }
    res.render('signin', {
        visit: req.session.isVisit
    });
    next();
}).post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var { email, password } = req.body;
    var users = yield models_1.userModel.find().exec();
    var user = yield models_1.userModel.findOne({ email, password }).exec();
    console.log('user', user);
    console.log('users', users);
    if (user) {
        req.session.user = user;
        res.render('index', { user: user });
    }
    else {
        res.render('signin', { errorMsg: '邮箱或密码错误' });
    }
}));
module.exports = router;
