import express = require('express');
import { playerModel } from '../models/index';

var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  var players = await playerModel.find().exec();
  res.render('index',
    {
      players: players
    }
  );
});

module.exports = router;
