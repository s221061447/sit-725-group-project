const express = require("express");
const authApi = require("./controllers/auth.js");
const { authorize } = require('./middleware/jwt');
const roles = require("./util/roles");
var cors = require('cors');
var path = require('path');
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const { MONGODB_URI } = process.env;

// const loginUserController = require("./controllers/loginUser");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(
    expressSession({
        secret: "secret",
        store: connectMongo.create({
            mongoUrl: MONGODB_URI
        })
    })
);


// Configure routes
app.use('/auth', authApi);

// For testing. To be removed in the next feature implementation.
app.get("/welcome", authorize(roles.User), (req, res) => {
    res.status(200).send("Welcome 🙌");
});

app.post("/users/login", loginUserController);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/register',(req,res)=>{
    res.sendFile(__dirname+'/UI/register.html');
})

app.use('/login',(req,res)=>{
    res.sendFile(__dirname+'/UI/login.html');
})

app.use('/dashboard',(req,res)=>{
    res.sendFile(__dirname+'/UI/dashboard.html');
})

app.use('/forgotPassword',(req,res)=>{
    res.sendFile(__dirname+'/UI/forgot-password.html');
})


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