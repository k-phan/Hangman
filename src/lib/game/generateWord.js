'use strict';

var randomWordGen = require('random-word');

module.exports = function () {
    var newRandomWord = '';
    while (newRandomWord.length < 5) {
        newRandomWord = randomWordGen();
    }
    return newRandomWord;
};