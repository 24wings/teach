import express = require('express');
import mongoose = require('mongoose');
import { userModel } from '../models';
/**
 * 数据表格
 */
interface TableRelation {
    tableName: string;
    title: string;
    fields: [{ label: string, key: string, value?: any }];
    model: mongoose.Model<any>;

}
var tableRelationMap = new Map<string, TableRelation>([
    ['user',
        {
            tableName: 'user',
            title: '学生',
            fields: [{ label: '_id', key: '_id' }, { label: '邮箱', key: 'email' }, { label: '密码', key: 'password' }],
            model: userModel
        }]
]
);
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
router.get('/tables/:tableName/', async (req, res, next) => {
    var tableName = req.params.tableName;
    var tableRelation = tableRelationMap.get(tableName);

    if (tableRelation) {
        var data = await tableRelation.model.find().exec();
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
});
/**
 * 详情页
 */
router.get('/tables/:tableName/:_id', async (req, res, next) => {
    var { tableName, _id } = req.params;
    var tableRelation = tableRelationMap.get(tableName);
    if (tableRelation) {

        if (_id != 0 && _id) {
            console.log(_id);
            var data = await tableRelation.model.findOne({ _id }).exec();
            res.render('admin/tables-detail', {
                tableName: tableName,
                title: tableRelation.title,
                data: data,
                fields: tableRelation.fields
            });
        }
        // 创建数据
        else {
            res.render('admin/tables-detail', {
                tableName: tableName,
                title: tableRelation.title,
                data: null, //这里设置空数据,如果没有数据则显示创建按钮
                fields: tableRelation.fields
            });
        }

    } else {
        res.json({
            issuccess: false,
            data: '参数不合法'
        })
    }
})
    .post('/tables/:tableName/:_id', async (req, res, next) => {
        var { _id, tableName } = req.params;
        var tableRelation = tableRelationMap.get(tableName);
        if (tableRelation) {
            // 更新
            if (_id != 0 && _id) {
                var updateResult = await tableRelation.model.update({ _id }, req.body);
                res.json({
                    issuccess: true,
                    data: updateResult
                });
            }
            // 创建
            else {
                console.log(req.body);
                var newModel = new tableRelation.model(req.body);
                var createResult = await newModel.save();
                res.json({
                    issuccess: true,
                    dat: createResult
                });
            }

        } else {
            res.send('参数不合法');
        }

    })




module.exports = router;