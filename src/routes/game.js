var express = require('express')
var router = express.Router()
var debug = require('debug')('routes-game')
var checkAuthentication = require('../misc/checkAuthentication')
var randomWordGen = require('random-word')

router.get('/', checkAuthentication, function (req, res, next) {
	debug("In game: " + req.user)
	return res.render('game', {
		title: 'Hangman',
		score: req.user.score,
		activeGame: req.user.activeGame
	})
})

router.get('/new-game', checkAuthentication, function (req, res, next) {
	if (req.user.activeGame.exists) {
		return res.redirect('/game')
	}
	var newRandomWord = ''
	while (newRandomWord.length < 5) {
		newRandomWord = randomWordGen()
	}
	var conditions = {
		username: req.user.username
	}
	req.app.mongodb.models.User.findOne(conditions, function (err, user) {
		if (err) {
			return res.render('error', { message: err })
		}
		user.activeGame.chars = []
		user.activeGame.exists = true
		user.activeGame.word = newRandomWord
		user.activeGame.gameState = 0;
		user.activeGame.remaining = newRandomWord.length
		user.activeGame.wordToRender = new Array(newRandomWord.length + 1).join('_')
		user.save(function (err, updatedUser) {
			if (err) {
				return res.render('error', { message: err })
			}
			return res.redirect('/game')
		})
	})
})

router.post('/guess-letter', checkAuthentication, function (req, res, next) {
	// Check if game exists
	if (!req.user.activeGame.exists) {
		return res.redirect('/game')
	}

	// Check if the guess is a letter
	if (!req.body.guess || req.body.guess.length !== 1 || !req.body.guess.match(/[a-z]/i)) {
		return res.redirect('/game')
	}

	debug('Error checking - SUCCESS')

	var guess = req.body.guess.toLowerCase()

	var conditions = {
		username: req.user.username
	}	

	req.app.mongodb.models.User.findOne(conditions, function (err, user) {
		if (err) {
			return res.render('error', { message: err })
		}

		// Check if character has already been guessed
		if (user.activeGame.chars.indexOf(guess) !== -1) {
			return res.render('game', {
				title: 'Hangman',
				score: req.user.score,
				activeGame: req.user.activeGame,
				alreadyGuessed: true
			})
		}
		user.activeGame.chars.push(guess)

		var remaining = user.activeGame.remaining
		var newWordToRender = user.activeGame.wordToRender

		// Replace all of the correct letters
		for(var ii = 0; ii < user.activeGame.word.length; ii++) {
			if (user.activeGame.word.charAt(ii) === guess) {
				newWordToRender = (newWordToRender.substr(0,ii) + user.activeGame.word.charAt(ii) 
					+ newWordToRender.substr(ii + 1))
				user.activeGame.remaining -= 1
			}
		}

		user.activeGame.wordToRender = newWordToRender

		// If nothing was replaced, increment game state
		if (remaining === user.activeGame.remaining) {
			user.activeGame.gameState += 1
		}

		// Check if game is lost
		if (user.activeGame.gameState === 10) {
			user.activeGame.exists = false
			user.score.losses += 1
			user.save(function (err, updatedUser) {
				if (err) {
					return res.render('error', { message: err })
				}

				return res.redirect('/game/game-status')
			})			
		}

		// Check if game is won
		else if (user.activeGame.remaining === 0) {
			user.activeGame.exists = false
			user.score.wins += 1
			user.save(function (err, updatedUser) {
				if (err) {
					return res.render('error', { message: err })
				}

				return res.redirect('/game/game-status')
			})
		}
		else {
			user.save(function (err, updatedUser) {
				if (err) {
					return res.render('error', { message: err })
				}

				return res.redirect('/game')
			})
		}
	})
})

router.get('/game-status', checkAuthentication, function (req, res, next) {
	if(req.user.activeGame.exists) {
		return res.redirect('/game')
	}

	return res.render('status', { 
		title: 'Game Status', 
		score: req.user.score,
		activeGame: req.user.activeGame
	})
})

module.exports = router