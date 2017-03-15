import express = require('express');
import { userModel } from '../models';
var router = express.Router();


router.get('/', (req, res, next) => {

    res.render('signup', {
        visit: req.session.isVisit
    });
    next();
}).post('/', async (req, res, next) => {
    var { email, password } = req.body;

    var isEmailExist = await userModel.count({ email }).exec()

    if (!isEmailExist) {
        var saveResult = await new userModel({ email, password }).save()
        console.log(saveResult);
        res.redirect('/');

    } else {
        res.render('signup', { errorMsg: '改邮箱已经被注册' });
    }

})

module.exports = router;