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
        const { first_name, last_name, email, role, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name && role)) {
            res.status(400).json({ message: "All inputs are required!" });
        }

        // Generate unique user id using murmurhash3
        const user_id = hash.getHash(email);
    
        // Check if user already exist
        const oldUser = await doesUserExist(user_id);
    
        if (oldUser) {
            return res.status(409).json({ message: "User already exists. Please Login." });
        }

        // Set the is_active parameter and check if provided role is valid
        let is_active;
        switch (role) {
            case roles.Admin:
                return res.status(403).json({ message: "Cannot register as an admin." });
            case roles.Organization:
                is_active = false;
                break;
            case roles.Manager:
                is_active = true;
                break;
            case roles.User:
                is_active = true;
                break;
            default:
                return res.status(403).json({ message: "Please provide a valid role." });
        }
    
        // Encrypt user password using bcrypt
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create token
        const jwtInfo = new JwtInfo(user_id, first_name, last_name, email, role, is_active);
        const token = generateToken(jwtInfo);

        // Create user in database
        const user = await createUser(user_id, first_name, last_name, email.toLowerCase(), encryptedPassword, role, token, is_active);
        
        console.log(`New user signed up. User ID: ${user_id}`);
        res.status(201).json(createResponseUserObject(user.email, user.first_name, user.last_name, user.role, user.token));
    } catch (err) {
        console.error(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
            res.status(400).json({ message: "Please enter both email and password!" });
            return;
        }

        // Validate if user exist in our database
        user_id = hash.getHash(email);
        let user = await getUser(user_id);
    
        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.is_active != true) {
                res.status(401).json({ message: "Your access has been disabled" });
            } else{
                // Create token
                const jwtInfo = new JwtInfo(user.user_id, user.first_name, user.last_name, user.email, user.role, user.is_active);
                const token = generateToken(jwtInfo);

                // save user token
                user = await updateUser(user_id, { token: token });

                res.status(200).json(createResponseUserObject(user.email, user.first_name, user.last_name, user.role, user.token));
                console.log(`User ${user_id} signed in`);
            }
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});


// For response do not include id or password. Front-end will always query with email as ID. ID conversion will happen in the back-end. 
const createResponseUserObject = (email, first_name, last_name, role, token) => {
    return {
        email: email,
        first_name: first_name,
        last_name: last_name,
        role: role,
        token: token
    };
};

module.exports = router;