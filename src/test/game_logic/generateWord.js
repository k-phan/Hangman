'use strict';

var assert = require('assert');
var generateWord = require('../../lib/game/generateWord');

describe('Game Logic', function () {
    describe('#generateWord()', function () {
        it('should generate 100 words of length >= 5', function () {
            var words = 0;
            for (var ii = 0; ii < 100; ii++) {
                if (generateWord().length >= 5) {
                    words += 1;
                }
            }

            assert.equal(100, words);
        });
    });
});