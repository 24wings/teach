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
var TableMap = new Map([
    ['user', models_1.userModel]
]);
router.get('/user/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.params._id) {
        var user = yield models_1.userModel.findOne({ _id: req.params._id }).exec();
        res.json({
            issuccess: true,
            data: user
        });
    }
    else {
        var users = yield models_1.userModel.find().exec();
        res.json({
            issuccess: true,
            data: user
        });
    }
    next();
})).post('/', (req, res, next) => {
    // req.
    res.render('index');
})
    .delete('/rest/:tableName', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var tableName = req.params.tableName;
    var _id = req.query._id;
    if (!tableName) {
        res.json({ issuccess: false, data: '参数不合法' });
    }
    else {
        if (_id) {
            var delOneResult = yield models_1.userModel.findOneAndRemove({ _id }).exec();
            res.json({
                issuccess: true,
                data: '成功删除' + _id
            });
        }
        else {
            var delAllResult = yield models_1.userModel.remove({}).exec();
            res.json({
                issuccess: true,
                data: '成功删除所有用户'
            });
        }
    }
}));
module.exports = router;
