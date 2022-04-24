const express = require('express');
const router = express.Router();
const hash = require('../util/id-hash');
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { verifyToken, generateToken } = require('../middleware/jwt');
const JwtInfo = require("../models/jwt-info");

router.post('/register', async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, role, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name && role)) {
            res.status(400).send("All inputs are required!");
        }

        // Generate unique user id using murmurhash3
        const user_id = hash.getHash(email);
    
        // Check if user already exist
        const oldUser = await User.exists({ user_id });
    
        if (oldUser) {
            return res.status(409).send("User already exists. Please Login.");
        }
    
        // Encrypt user password using bcrypt
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create token
        const jwtInfo = new JwtInfo(user_id, first_name, last_name, email, role);
        const token = generateToken(jwtInfo);

        // Create user in database
        const user = await User.create({
            _id: user_id,
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role,
            token: token
        });
        
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
            res.status(400).send("Please enter both email and password!");
            return;
        }

        // Validate if user exist in our database
        user_id = hash.getHash(email);
        let user = await User.findById(user_id);
    
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const jwtInfo = new JwtInfo(user.user_id, user.first_name, user.last_name, user.email, user.role);
            const token = generateToken(jwtInfo);
    
            // save user token
            user = await User.findByIdAndUpdate(user_id, { token: token }, { new: true });
            
            res.status(200).json(createResponseUserObject(user.email, user.first_name, user.last_name, user.role, user.token));
            console.log(`User ${user_id} signed in`);
        } else {
            res.status(400).send("Invalid Credentials");
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