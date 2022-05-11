const murmurhash = require('murmurhash')

exports.getHash = function(str) {
    try {
        let hash = murmurhash.v3(str);
        if (!hash) {
            throw new Error("Error gernating hash");
        } else {
            return hash;
        }
    } catch (err) {
        console.log("Error generating hash");
        throw err;
    }
};