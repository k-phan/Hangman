'use strict';

var debug = require('debug')('processGuess');
var status = require('./guessEnum');

module.exports = function (app, userGuess, query, done) {
    app.mongodb.models.User.findOne(query, function (err, user) {
        if (err) {
            return done(err, status.ERROR);
        }

        var guess = userGuess.toLowerCase();

        if (user.activeGame.chars.indexOf(guess) !== -1) {
            debug('Value of status.REPEAT: ' + status.REPEAT);
            return done(null, status.REPEAT);
        }

        debug('Not Repeat -- Continue');
        user.activeGame.chars.push(guess);

        var remaining = user.activeGame.remaining,
            newWordToRender = user.activeGame.wordToRender,
            ii = 0;

        for (ii = 0; ii < user.activeGame.word.length; ii += 1) {
            if (user.activeGame.word.charAt(ii) === guess) {
                newWordToRender = (newWordToRender.substr(0, ii)
                    + user.activeGame.word.charAt(ii)
                    + newWordToRender.substr(ii + 1));
                user.activeGame.remaining -= 1;
            }
        }

        user.activeGame.wordToRender = newWordToRender;

        if (remaining === user.activeGame.remaining) {
            user.activeGame.gameState += 1;
        }

        if (user.activeGame.gameState === 10) {
            user.activeGame.exists = false;
            user.score.losses += 1;
            user.save(function (err, updatedUser) {
                if (err) {
                    return done(err, status.ERROR);
                }

                return done(null, status.GAMEOVER);
            });
        } else if (user.activeGame.remaining === 0) {
            user.activeGame.exists = false;
            user.score.wins += 1;
            user.save(function (err, updatedUser) {
                if (err) {
                    return done(err, status.ERROR);
                }

                return done(null, status.GAMEOVER);
            });
        } else {
            user.save(function (err, updatedUser) {
                if (err) {
                    return done(null, status.OK);
                }

                return done(null, status.OK);
            });
        }
    });
};