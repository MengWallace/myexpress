var setting = require('../settings');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
module.exports = new Db(Settings.db, new Server(settings.host, settings.port),{safe:true});
