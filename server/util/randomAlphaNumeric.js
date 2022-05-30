exports.generateRandomAlphaNumeric = function() {
    for (let result = ''; result.length < 32;) {
        result += Math.random().toString(36).substr(2, 1);
    }
    return result;
};

