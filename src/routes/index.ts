import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
    {
      categorys: ['typescript', 'angular2', '新奇']
    }
  );
});

module.exports = router;
