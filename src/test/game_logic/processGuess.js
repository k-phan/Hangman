'use strict';

var assert = require('assert');
var processGuess = require('../../lib/game/processGuess');
var status = require('../../lib/game/guessEnum');
var app = {
    mongodb: require('../mocks/mockMongoProcess')
};

describe('Game Logic', function () {
    describe('#processGuess()', function () {
        it('should return a status.REPEAT if guess is repeated: "A" and "a"', function () {
            var guesses = ['A', 'a'],
                iter = 0;

            app.mongodb.reset();
            for (iter = 0; iter < guesses.length; iter += 1) {
                processGuess(app, guesses[iter], { username: 'kphan' }, function (err, ret) {
                    assert.equal(status.REPEAT, ret);
                });
            }
        });

        it('should return a status.GAMEOVER with gamestate = 10 (loss)', function () {
            var guesses = ['z', 'q', 'g', 'n', 'y', 'l', 'u', 'j', 'i'],
                iter = 0;

            app.mongodb.reset();
            for (iter = 0; iter < guesses.length - 1; iter += 1) {
                processGuess(app, guesses[iter], { username: 'kphan' }, function (err, ret) {
                    assert.equal(status.OK, ret);
                });
            }
            processGuess(app, guesses[iter], { username: 'kphan' }, function (err, ret) {
                assert.equal(status.GAMEOVER, ret);
                assert.equal(10, app.mongodb.getUser().activeGame.gameState);
            });
        });

        it('should return a status.GAMEOVER with remaining = 0 (win)', function () {
            var guesses = ['w', 'h', 'o', 'r', 'e', 'd', 'm', 's'],
                iter = 0;

            app.mongodb.reset();
            for (iter = 0; iter < guesses.length - 1; iter += 1) {
                processGuess(app, guesses[iter], { username: 'kphan' }, function (err, ret) {
                    assert.equal(status.OK, ret);
                });
            }
            processGuess(app, guesses[iter], { username: 'kphan' }, function (err, ret) {
                assert.equal(status.GAMEOVER, ret);
                assert.equal(0, app.mongodb.getUser().activeGame.remaining);
            });
        });
    });
});