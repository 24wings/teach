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
var tableRelationMap = new Map([
    ['user',
        {
            tableName: 'user',
            title: '学生',
            fields: [{ label: '_id', key: '_id' }, { label: '邮箱', key: 'email' }, { label: '密码', key: 'password' }],
            model: models_1.userModel
        }]
]);
var router = express.Router();
router.get('/', (req, res, next) => {
    res.render('admin/index', {});
    next();
}).post('/', (req, res, next) => {
    // req.
    res.render('index');
});
/**
 * 进入数据表
 */
router.get('/tables/:tableName/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var tableName = req.params.tableName;
    var tableRelation = tableRelationMap.get(tableName);
    if (tableRelation) {
        var data = yield tableRelation.model.find().exec();
        console.log(data);
        res.render('admin/tables', {
            tableName: tableName,
            title: tableRelation.title,
            data: data,
            fields: tableRelation.fields
        });
    }
    else {
        res.send('<h1>error</h1>');
    }
}));
/**
 * 详情页
 */
router.get('/tables/:tableName/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var { tableName, _id } = req.params;
    var tableRelation = tableRelationMap.get(tableName);
    if (tableRelation) {
        if (_id != 0 && _id) {
            console.log(_id);
            var data = yield tableRelation.model.findOne({ _id }).exec();
            res.render('admin/tables-detail', {
                tableName: tableName,
                title: tableRelation.title,
                data: data,
                fields: tableRelation.fields
            });
        }
        else {
            res.render('admin/tables-detail', {
                tableName: tableName,
                title: tableRelation.title,
                data: null,
                fields: tableRelation.fields
            });
        }
    }
    else {
        res.json({
            issuccess: false,
            data: '参数不合法'
        });
    }
}))
    .post('/tables/:tableName/:_id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var { _id, tableName } = req.params;
    var tableRelation = tableRelationMap.get(tableName);
    if (tableRelation) {
        // 更新
        if (_id != 0 && _id) {
            var updateResult = yield tableRelation.model.update({ _id }, req.body);
            res.json({
                issuccess: true,
                data: updateResult
            });
        }
        else {
            console.log(req.body);
            var newModel = new tableRelation.model(req.body);
            var createResult = yield newModel.save();
            res.json({
                issuccess: true,
                dat: createResult
            });
        }
    }
    else {
        res.send('参数不合法');
    }
}));
module.exports = router;
