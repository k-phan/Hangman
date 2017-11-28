'use strict';

module.exports = function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};
