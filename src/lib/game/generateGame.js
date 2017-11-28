'use strict';

var generateWord = require('./generateWord');

module.exports = function (app, query, done) {
    app.mongodb.models.User.findOne(query, function (err, user) {
        if (err) {
            return done(err);
        }
        var randomWord = generateWord();
        user.activeGame.chars = [];
        user.activeGame.exists = true;
        user.activeGame.word = randomWord;
        user.activeGame.gameState = 0;
        user.activeGame.remaining = randomWord.length;
        user.activeGame.wordToRender = new Array(randomWord.length + 1).join('_');
        user.save(function (err, updatedUser) {
            if (err) {
                return done(err);
            }
            return done(null);
        });
    });
};