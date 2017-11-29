var assert = require('assert');
describe('Mocha', function () {
    describe('Basic Functionality', function () {
        it('should return -1 when x is not present during indexOf(x)', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});