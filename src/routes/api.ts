import express = require('express');

var router = express.Router();


router.get('/userExisit', (req, res, next) => {
    if (req.session.isVisit) {
        req.session.isVisit++
    } else {
        req.session.isVisit = 1

    }



    res.render('signin', {
        visit: req.session.isVisit
    });
    next();
}).post('/', (req, res, next) => {
    // req.
    res.render('index');
})

module.exports = router;