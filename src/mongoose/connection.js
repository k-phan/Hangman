'use strict'

var mongoose = require('mongoose')
var debug = require('debug')('mongoose-connection')

const URI = ('mongodb://' + process.env.MONGO_IP + ':' +
	process.env.MONGO_PORT + '/' + process.env.MONGO_MONGOOSE)

const options = {
	useMongoClient: true
}

module.exports = mongoose.connect(URI, options, function (err) {
	if (err) {
		debug('Error! ' + err)
		throw new Error('MongoDB connection failed: ' + err)
	} else {
		debug('Connection created')
	}
})