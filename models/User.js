var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  gender: {type: String, default: ''},
  avatar: {type: String, default: ''},
  phone: {type: String, default: ''},
  bio: {type: String, default: ''}
}, {collection: 'users'});
var Model = mongoose.model('User', schema);

module.exports = Model;