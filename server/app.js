const express = require("express");
const authApi = require("./controllers/auth.js");
const { authorize } = require('./middleware/jwt');
const roles = require("./util/roles");
var cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

// Configure routes
app.use('/auth', authApi);

// For testing. To be removed in the next feature implementation.
app.get("/welcomeUser", authorize(roles.User), (req, res) => {
    res.status(200).send("Welcome 🙌");
});

// For testing. To be removed in the next feature implementation.
app.get("/welcomeAdmin", authorize(roles.Admin), (req, res) => {
    res.status(200).send("Welcome 🙌");
});

// This should be the last route. Any after it won't work.
app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "Unknown route",
        },
    });
});

module.exports = app;