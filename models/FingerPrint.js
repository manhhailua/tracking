var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
  fingerPrint: {type: String, default: ''},
  ips: [String]
}, {collection: 'finger-prints'});
var Model = mongoose.model('FingerPrint', schema);

module.exports = Model;