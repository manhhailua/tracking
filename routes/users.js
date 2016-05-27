var express = require('express');
var router = express.Router();

var FingerPrint = require('../models/FingerPrint');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var fingerPrint = new FingerPrint({
    fingerPrint: req.query.fp,
    ips: [req.ip]
  });

  FingerPrint.findOneAndUpdate(
    {fingerPrint: req.query.fp},
    {$addToSet: {ips: req.ip}},
    function (error, fp) {
      if (error || !fp) {
        fingerPrint.save();
        console.log('This is a NEW user!');
      } else {
        console.log('This is a RETURN user!');
      }
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    }
  );

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(req.query);
  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log('IP Address:', req.ip);

  res.header('Content-Type', 'image/gif');
  res.sendStatus(200);
});

module.exports = router;
