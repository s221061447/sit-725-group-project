const mongoose = require("mongoose");

const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE_NAME } = process.env;
const uri = "mongodb+srv://" + MONGO_USER + ":" + MONGO_PASSWORD + "@sit725.pidyf.mongodb.net/" + MONGO_DATABASE_NAME + "?retryWrites=true&w=majority";

exports.connect = () => {
    mongoose.connect(uri).then(() => {
        console.log("Successfully connected to database");
    }).catch((error) => {
        console.log("Database connection failed. Exiting application...");
        console.error(error);
        process.exit(1);
    });
};