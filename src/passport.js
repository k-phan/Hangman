'use strict'

exports = module.exports = function (app, passport) {
	var LocalStrategy = require('passport-local').Strategy

	passport.use(new LocalStrategy(
		function (username, password, done) {
			var conditions = { username: username.toLowerCase() }
			app.mongodb.models.User.findOne(conditions, function (err, user) {
				if (err) {
					return done(err)
				}
				
				if (!user) {
					return done(null, false, { message: 'Incorrect UN' })
				}

				app.mongodb.models.User.validatePassword(password, user.password, function (err, valid) {
					if (err) {
						return done(err)
					}

					if (!valid) {
						return done(null, false, { message: 'Incorrect PW' })
					}

					return done(null, user)
				})
			})
		}
	))

	passport.serializeUser(function (user, done) {
		done(null, user.id)
	})

	passport.deserializeUser(function (id, done) {
		var conditions = { _id: id }
		app.mongodb.models.User.findOne(conditions).exec(function (err, user) {
			done(err, user)
		})
	})
}