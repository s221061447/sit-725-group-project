const murmurhash = require('murmurhash3');

exports.getHash = function(str) {
    try {
        let hash = murmurhash.murmur32Sync(str);
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