var express = require('express');
var router = express.Router();

var FingerPrint = require('../models/FingerPrint');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  // Evercookie logging
  console.log('cookies: ', req.cookies);
  // Finger print logging
  console.log('query string: ', req.query);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

  // Response
  res.header('Content-Type', 'image/gif');
  res.sendStatus(200);
});

module.exports = router;
