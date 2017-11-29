'use strict';

var myUser = {
    username: 'kphan',
    password: '$2a$06$20w1.7wkJAqhLOIrHw31U.QAm5.Mqup1DZIpvuEBbRbvjTLiiPbEm',
    activeGame: {
        remaining: 9,
        gameState: 1,
        chars: [ 'a' ],
        wordToRender: '_________',
        word: 'whoredoms',
        exists: true
    },
    score: {
        wins: 5,
        losses: 6
    },
    save: function (done) {
        done(null, this);
    }
};

var mockMongo = {
    getUser: function () {
        return myUser;
    },
    models: {
        User: {
            findOne: function (query, done) {
                if (myUser.username === query.username) {
                    done(null, myUser);
                }
            }
        }
    },
    reset: function () {
        myUser = {
            username: 'kphan',
            password: '$2a$06$20w1.7wkJAqhLOIrHw31U.QAm5.Mqup1DZIpvuEBbRbvjTLiiPbEm',
            activeGame: {
                remaining: 9,
                gameState: 1,
                chars: [ 'a' ],
                wordToRender: '_________',
                word: 'whoredoms',
                exists: true
            },
            score: {
                wins: 5,
                losses: 6
            },
            save: function (done) {
                done(null, this);
            }
        };
    }
};

module.exports = mockMongo;