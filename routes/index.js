var express = require('express');
var router = express.Router();
var faker = require('faker');
var fs = require('fs');

var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('guid: ', req.cookies.guid);

  res.render('index', {
    title: 'Tracking Client Testing Site',
    guid: req.cookies.guid || 'Not yet set!'
  });
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

// Dynamic tracking.js
router.get('/tracking.js', function (req, res, next) {
  try {
    var script = fs.readFileSync('./public/bower_components/fingerprintjs2/fingerprint2.js', 'utf8');
    script += fs.readFileSync('./public/bower_components/evercookie/js/swfobject-2.2.min.js', 'utf8');
    script += fs.readFileSync('./public/bower_components/evercookie/js/_evercookie.js', 'utf8');
    script += fs.readFileSync('./public/javascripts/request.js', 'utf8');

    res.set('Content-Type', 'application/javascript');
    res.send(script);
  } catch (error) {
    throw error;
  }
});

// Test jsonp callback
router.get('/jsonp', function (req, res, next) {
  res.jsonp({a: 'b', c: 'd'});
});

module.exports = router;
