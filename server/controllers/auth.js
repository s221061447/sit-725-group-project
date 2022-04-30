const express = require('express');
const router = express.Router();
const hash = require('../util/id-hash');
const bcrypt = require("bcryptjs");
const { createUser, doesUserExist, getUser, updateUser } = require("../models/user");
const JwtInfo = require("../models/jwt-info");
const { authorize, generateToken } = require('../middleware/jwt');
const roles = require("../util/roles");

router.post('/register', async (req, res) => {
    try {
        // Get user input
        const { firstName, lastName, email, role, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstName && lastName && role)) {
            res.status(400).json({ message: "All inputs are required!" });
        }

        // Generate unique user id using murmurhash3
        const userId = hash.getHash(email);

        // Check if provided role is valid and insert into correct table based on role
        let isActive;
        switch (role) {
            case roles.Admin:
                return res.status(403).json({ message: "Cannot register as an admin." });
            case roles.Organization:
                isActive = false;
                break;
            case roles.Manager:
                isActive = true;
                break;
            case roles.User:
                isActive = true;

                // Check if user already exist
                const oldUser = await doesUserExist(userId);
                if (oldUser) {
                    return res.status(409).json({ message: "User already exists. Please Login." });
                }
                
                // Get encrypted password and JWT
                const {encryptedPassword, token} = await getEncryptedPasswordAndJwt(userId, firstName, lastName, email, null, null, role, password);

                // Create user in database
                const user = await createUser(userId, firstName, lastName, email.toLowerCase(), encryptedPassword, role, token, isActive);
                
                console.log(`New user signed up. User ID: ${userId}`);
                res.status(201).json(createResponseUserObject(user.email, user.firstName, user.lastName, user.role, user.token));
                break;
            default:
                return res.status(403).json({ message: "Please provide a valid role." });
        }
        
    } catch (err) {
        console.error(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Get user input
        const { email, role, password } = req.body;
    
        // Validate user input
        if (!(email && role && password)) {
            res.status(400).json({ message: "Please enter email, role, and password!" });
            return;
        }

        // Validate if user exist in our database
        let userId = hash.getHash(email);

        switch (role) {
            case roles.Admin:
                break;
            case roles.Organization:
                break;
            case roles.Manager:
                break;
            case roles.User:
                user = await getUser(userId);
                if (user && (await bcrypt.compare(password, user.password))) {
                    if (user.isActive != true) {
                        res.status(401).json({ message: "Your access has been disabled" });
                    } else{
                        // Create token
                        const jwtInfo = new JwtInfo(userId, user.firstName, user.lastName, user.email, null, null, user.role);
                        const token = generateToken(jwtInfo);
        
                        // save user token
                        user = await updateUser(userId, { token: token });
        
                        res.status(200).json(createResponseUserObject(user.email, user.firstName, user.lastName, user.role, user.token));
                        console.log(`User ${userId} signed in`);
                    }
                } else {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
            default:
                return res.status(403).json({ message: "Please provide a valid role." });
        }
    } catch (err) {
        console.log(err);
    }
});

const getEncryptedPasswordAndJwt = async (userId, firstName, lastName, email, organizationId, rooms, role, password) => {
    // Encrypt user password using bcrypt
    const encryptedPassword = await bcrypt.hash(password, 10);
            
    // Create token
    const jwtInfo = new JwtInfo(userId, firstName, lastName, email, organizationId, rooms, role);
    const token = generateToken(jwtInfo);
    
    return {encryptedPassword, token};
};


// For response do not include id or password. Front-end will always query with email as ID. ID conversion will happen in the back-end. 
const createResponseUserObject = (email, firstName, lastName, role, token) => {
    return {
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        token: token
    };
};

module.exports = router;