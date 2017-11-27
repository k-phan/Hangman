'use strict'

exports = module.exports = function (app, mongoose) {
	var User = new mongoose.Schema({
		username: { type: String, index: true, unique: true },
		password: String,
		score: {
			wins: Number,
			losses: Number
		},
		activeGame: {
			exists: { type: Boolean, default: false },
			word: { type: String, default: '' },
			wordToRender: { type: String, default: ''},
			chars: [String],
			gameState: { type: Number, default: 0 },
			remaining: { type: Number, default: 0 }
		}
	})

	User.statics.encryptPassword = function (password, done) {
		var bcrypt = require('bcrypt')
		var saltRounds = 6
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				return done(err)
			}

			bcrypt.hash(password, salt, function (err, hash) {
				done(err, hash)
			})
		})
	}

	User.statics.validatePassword = function (password, hash, done) {
		var bcrypt = require('bcrypt')
		bcrypt.compare(password, hash, function (err, res) {
			done(err, res)
		})
	}

	app.mongodb.model('User', User)
}