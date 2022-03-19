const express = require("express");
const authApi = require("./api/auth.js");

const app = express();

app.use('/auth', authApi);

// This should be the last route else any after it won't work
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