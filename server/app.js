const express = require("express");
const authApi = require("./controllers/auth.js");
const { authorize } = require('./middleware/jwt');
const roles = require("./util/roles");

const app = express();
app.use(express.json());

// Configure routes
app.use('/auth', authApi);

// For testing. To be removed in the next feature implementation.
app.get("/welcome", authorize(roles.User), (req, res) => {
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