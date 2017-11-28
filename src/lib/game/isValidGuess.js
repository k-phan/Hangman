'use strict';

module.exports = function (guess) {
    if (!guess || guess.length !== 1) {
        return 0;
    }

    guess.toLowerCase();
    if (!guess.match(/[a-z]/i)) {
        return 0;
    }

    return 1;
};