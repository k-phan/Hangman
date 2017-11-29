'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('routes-game');
var checkAuthentication = require('../misc/checkAuthentication');
var gameManager = require('../gameLogic');

router.get('/', checkAuthentication, function (req, res, next) {
    debug("[Route: '/game'] User: " + req.user);
    return res.render('game', {
        title: 'Hangman',
        score: req.user.score,
        activeGame: req.user.activeGame
    });
});

router.get('/new-game', checkAuthentication, function (req, res, next) {
    if (req.user.activeGame.exists) {
        return res.redirect('/game');
    }

    var user = {
        username: req.user.username
    };

    gameManager.generateGame(req.app, user, function (err) {
        if (err) {
            return res.render('error', { message: err });
        }
        return res.redirect('/game');

    });
});

router.post('/guess-letter', checkAuthentication, function (req, res, next) {
    if (!req.user.activeGame.exists) {
        return res.redirect('/game');
    }

    if (!gameManager.isValidGuess(req.body.guess)) {
        return res.render('game', {
            title: 'Hangman',
            score: req.user.score,
            activeGame: req.user.activeGame,
            error: true,
            errorMsg: 'Invalid input! Please input a single letter!'
        });
    }

    var guess = req.body.guess.toLowerCase(),
        user = {
            username: req.user.username
        };

    gameManager.processGuess(req.app, guess, user, function (err, status) {
        if (err) {
            return res.render('error', { message: err });
        }

        switch (status) {
        case gameManager.guess.OK:
            return res.redirect('/game');
        case gameManager.guess.REPEAT:
            return res.render('game', {
                title: 'Hangman',
                score: req.user.score,
                activeGame: req.user.activeGame,
                error: true,
                errorMsg: 'You already guessed that letter!'
            });
        case gameManager.guess.GAMEOVER:
            return res.redirect('/game/game-status');
        default:
            return res.render('error', { message: 'Unknown error' });
        }
    });
});

router.get('/game-status', checkAuthentication, function (req, res, next) {
    if (req.user.activeGame.exists) {
        return res.redirect('/game');
    }

    return res.render('status', {
        title: 'Game Status',
        score: req.user.score,
        activeGame: req.user.activeGame
    });
});

module.exports = router;