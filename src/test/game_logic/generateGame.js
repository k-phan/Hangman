'use strict';

var assert = require('assert');
var app = {
    mongodb: require('../mocks/mockMongo')
};

var generateGame = require('../../lib/game/generateGame');

describe('Game Logic', function () {
    describe('#generateGame()', function () {
        it('should reset the user object\'s game data, but not score', function () {
            for (var ii = 0; ii < 10; ii += 1) {
                generateGame(app, { username: 'kphan' }, function (err) { });
                var game = app.mongodb.getUser().activeGame;
                assert.equal(0, game.chars.length);
                assert.equal(true, game.exists);
                assert.equal(0, game.gameState);
                assert.equal(game.word.length, game.remaining);
                assert.equal(game.word.length, game.wordToRender.length);
            }
        });

        it('should not reset score, however', function () {
            for (var ii = 0; ii < 10; ii += 1) {
                var scoreBefore = app.mongodb.getUser().score;
                generateGame(app, { username: 'kphan' }, function (err) { });
                var scoreAfter = app.mongodb.getUser().score;
                assert.equal(scoreBefore.wins, scoreAfter.wins);
                assert.equal(scoreBefore.losses, scoreAfter.losses);
            }
        });
    });
});