const jwt = require("jsonwebtoken");
const fs = require('fs');

// Load key pair
const pubKey = fs.readFileSync('./jwt-keys/ec-secp256k1-pub-key.pem');
const privKey = fs.readFileSync('./jwt-keys/ec-secp256k1-priv-key.pem');

// Validate if keys present
if (!pubKey || !privKey) {
    console.error("Keys for JWT not available. Exiting application...");
    process.exit(1);
} else {
    console.log("Loaded keys for JWT authentication");
}

// Generate a token given JWT info
const generateToken = (jwtInfo) => {
    let token = jwt.sign(
        jwtInfo.getObject(),
        privKey,
        {
            algorithm: 'ES256',
            expiresIn: '2h',
            issuer: 'SIT725'
        }
    );
    return token;
}

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // validate jwt and authorize based on user role
        (req, res, next) => {
            const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];

            if (!validateTokenFormat(token)) {
                return res.status(403).json({ message: "A token is required for authentication"});
            }

            try {
                const decoded = jwt.verify(token.split(" ")[1], pubKey, { algorithms: ['ES256'], issuer: 'SIT725' });
                req.user = decoded;
            } catch (err) {
                return res.status(401).json({ message: "Invalid Token"});
            }
            
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (req.user.is_active != true) {
                // user is disabled
                return res.status(401).json({ message: "Your access has been disabled" });
            }

            // authentication and authorization successful
            next();
        }
    ];
};

const validateTokenFormat = (token) => {
    if (!token) {
        return false;
    }

    let parts = token.split(" ");
    
    if (parts.length == 2) {
        return ((parts[0] == "Bearer") && (parts[1].length > 0));
    } else {
        return false;
    }
};

module.exports = { authorize, generateToken };