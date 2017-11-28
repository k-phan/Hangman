'use strict';

var mongoose = require('mongoose');
var debug = require('debug')('mongoose-connection');

var URI = ('mongodb://' + process.env.MONGO_IP + ':' + process.env.MONGO_PORT + '/'
    + process.env.MONGO_DB_NAME);

var options = {
    useMongoClient: true
};

module.exports = mongoose.connect(URI, options, function (err) {
    if (err) {
        debug('Error! ' + err);
        throw new Error('MongoDB connection failed: ' + err);
    }
    debug('Connection created');
});