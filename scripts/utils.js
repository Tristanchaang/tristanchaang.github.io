var assert;
(function (assert) {
    function fail() {
        throw new Error('Assertion failed');
    }
    assert.fail = fail;
})(assert || (assert = {}));
