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
    res.render('signup', {
        visit: req.session.isVisit
    });
    next();
}).post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var { email, password } = req.body;
    var isEmailExist = yield models_1.userModel.count({ email }).exec();
    if (!isEmailExist) {
        var saveResult = yield new models_1.userModel({ email, password }).save();
        console.log(saveResult);
        res.redirect('/');
    }
    else {
        res.render('signup', { errorMsg: '改邮箱已经被注册' });
    }
}));
module.exports = router;
