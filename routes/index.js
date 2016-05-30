var express = require('express');
var router = express.Router();
var faker = require('faker');
var fs = require('fs');

var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.session.test) {
    console.log('Chưa có test!');
    console.log(req.session);
    req.session.test = 'manhhailua';
    req.session.cookie.expires = Date.now() + 1000 * 10;
    req.session.cookie.maxAge = 1000 * 10;
  }

  res.render('index', {title: 'Tracking Client Testing Site'});
});

// Data fictions
router.get('/fake', function (req, res, next) {
  User.count({}, function (error, count) {
    if (error || !count) {
      for (var i = 0; i < 100; i++) {
        var gender = faker.random.arrayElement(['male', 'female']);
        var firstName = faker.name.firstName(gender);
        var lastName = faker.name.lastName(gender);

        var user = new User({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          avatar: faker.internet.avatar(),
          phone: faker.phone.phoneNumber(),
          bio: faker.lorem.paragraphs()
        });

        user.save(function (error, user, numAffected) {
          if (error) {
            console.log(error);
          }

          if (user) {
            console.log(user._id);
          }
        });
      }
    }
  });

  res.render('index', {title: 'Tracking Test - Faked data has been created!'})
});

router.get('/tracking.js', function (req, res, next) {
  try {
    var script = fs.readFileSync('./public/bower_components/fingerprintjs2/fingerprint2.js', 'utf8');
    script += fs.readFileSync('./public/bower_components/evercookie/js/swfobject-2.2.min.js', 'utf8');
    script += fs.readFileSync('./public/bower_components/evercookie/js/_evercookie.js', 'utf8');
    res.send(script);
  } catch (error) {
    throw error;
  }
});

// Test jsonp callback
router.get('/jsonp', function (req, res, next) {
  res.jsonp({a: 'b', c: 'd'});
});

// Test ajax request
router.get('/ajax', function (req, res, next) {
  res.send({name: 'ajax request response'});
});

// Iframe
router.get('/iframe', function (req, res, next) {
  res.render('iframe', {title: 'Iframe Page'});
});

module.exports = router;
