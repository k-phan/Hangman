'use strict';

var assert = require('assert');
var isValidGuess = require('../../lib/game/isValidGuess');

describe('Game Logic', function () {
    describe('#isValidGuess()', function () {
        it('should return 0 with invalid guess (multiple chars): "abcdef"', function () {
            assert.equal(0, isValidGuess('abcdef'));
        });
        it('should return 0 with invalid guess (number): 2', function () {
            assert.equal(0, isValidGuess(2));
        });
        it('should return 0 with invalid guess (negative number): -4', function () {
            assert.equal(0, isValidGuess(-1 * 4));
        });
        it('should return 0 with invalid guess (non alphanumeric char): "!"', function () {
            assert.equal(0, isValidGuess('!'));
        });
        it('should return 0 with invalid guess (non alphanumeric char): "?"', function () {
            assert.equal(0, isValidGuess('?'));
        });
        it('should return 1 with valid guess (lowercase alpha letter): "a"', function () {
            assert.equal(1, isValidGuess('a'));
        });
        it('should return 1 with valid guess (uppercase alpha letter): "B"', function () {
            assert.equal(1, isValidGuess('B'));
        });
    });
});