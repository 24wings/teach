import express = require('express');
import mongoose = require('mongoose');
import { userModel } from '../models';
var router = express.Router();


var TableMap = new Map<string, mongoose.Model<any>>([
    ['user', userModel]
]);

router.get('/user/:_id', async (req, res, next) => {
    if (req.params._id) {
        var user = await userModel.findOne({ _id: req.params._id }).exec();
        res.json({
            issuccess: true,
            data: user
        });
    } else {
        var users = await userModel.find().exec();
        res.json({
            issuccess: true,
            data: user
        });

    }

    next();
}).post('/', (req, res, next) => {
    // req.
    res.render('index');
})
    .delete('/rest/:tableName', async (req, res, next) => {
        var tableName = req.params.tableName;
        var _id = req.query._id;
        if (!tableName) {
            res.json({ issuccess: false, data: '参数不合法' })
        } else {
            if (_id) {
                var delOneResult = await userModel.findOneAndRemove({ _id }).exec();
                res.json({
                    issuccess: true,
                    data: '成功删除' + _id
                });
            } else {
                var delAllResult = await userModel.remove({}).exec()
                res.json({
                    issuccess: true,
                    data: '成功删除所有用户'
                });

            }
        }
    });

module.exports = router;