'use strict';

var gameManager = {
    generateGame: require('./lib/game/generateGame'),
    isValidGuess: require('./lib/game/isValidGuess'),
    guess: require('./lib/game/guessEnum'),
    processGuess: require('./lib/game/processGuess')
};

module.exports = gameManager;