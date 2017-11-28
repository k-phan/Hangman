'use strict';

var express = require('express');
var router = express.Router();
var debug = require('debug')('routes-index');
var passport = require('passport');
var checkAuthentication = require('../misc/checkAuthentication');
var checkDuplicate = require('../misc/checkDuplicate');

router.get('/', checkAuthentication, function (req, res, next) {
    debug(req.user);
    return res.render('welcome', {
        title: 'Hangman',
        user: req.user.username
    });
});

router.get('/login', function (req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    return res.render('login', { title: 'Login' });
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('login', {
                error: true
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            debug(user);
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function (req, res, next) {
    req.logout();
    return res.redirect('/');
});

router.post('/register', checkDuplicate, function (req, res, next) {
    req.app.mongodb.models.User.encryptPassword(req.body.password, function (err, hash) {
        if (err) {
            debug(err);
            return res.render('error', { message: err });
        }
        var fields = {
            username: req.body.username.toLowerCase(),
            password: hash,
            score: {
                wins: 0,
                losses: 0
            }
        };
        req.app.mongodb.models.User.create(fields, function (err, user) {
            if (err) {
                debug(err);
                return res.render('error', { message: err });
            }
            debug(user);
            return res.redirect('login');
        });
    });
});

module.exports = router;