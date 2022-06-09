require("dotenv").config();
const http = require("http");
const app = require("./app");
require("./mongo/init-connection").connect();
const {sendEmail} = require("./util/mail-client");

// Test email
// sendEmail("test", "covedt12022@gmail.com", "Test Email!");
// Successfully sent mail to receipient email.

const server = http.createServer(app);

const { EXPRESS_PORT } = process.env;
const port = EXPRESS_PORT;

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});