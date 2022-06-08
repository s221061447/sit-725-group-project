require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


const createTransporter = async () => {
    // Create OAuth2.0 Client
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );
    
    // Set refresh token in OAuth2.0 Client
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    });

    // Get a new Access Token using the OAuth2.0 Client
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject("Failed to create access token!");
            }
            resolve(token);
        });
    });

    // Using the retrieved credentials, create a nodemailer transport client
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });
  
    transporterClient = transporter;
};

// Send an email by providing the subject, to_email, and text
const sendEmail = async (subject, to, text) => {

    let transporter = await createTransporter();
    const emailObject = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };
    console.log(transporter);

    await transporter.sendEmail(emailObject);
};

module.exports = { sendEmail };