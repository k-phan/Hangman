'use strict';

module.exports = function checkDuplicate(req, res, next) {
    var conditions = { username: req.body.username.toLowerCase() };
    req.app.mongodb.models.User.findOne(conditions, function (err, user) {
        if (err) {
            res.render('error', { messaage: err });
        } else if (user) {
            return res.render('register', {
                title: 'Register',
                duplicate: true
            });
        }
        return next();
    });
};