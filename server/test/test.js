var expect  = require("chai").expect;
var request = require("request");

// registration page
 describe("  registration", function(){

    
    var url = "http://localhost:8000/register.html";

    //admin in registration
    describe("Admin", function(done){
        var url_admin = "http://localhost:8000/register.html";
        it("cant register as an admin", function(done){
            request(url_admin, function(error, response, body){
                expect(response.statusCode).to.equal(403);
                done()
            });
        });
    });
    
    // organisation in registration
    describe("Organisation", function(done){
        var url_org = "http://localhost:8000/register.html";
        it("should return status 201 as response when new organisation signs up", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(201);
                done()
              });
        });

        it("returns 400 if null entries are encountered", function(done){
            request(url_org, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
            });
        });

        it("returns 409 if entry already exists", function(done){
            request(url_org, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(409);
                done()
            });
        });
    });

    // manager in registration
    describe("Manager", function(done){
        var url_manager = "http://localhost:8000/register.html";
        it("should return status 201 as response when new manager role signs up", function(done) {
            request(url_manager, function(error, response, body) {
                expect(response.statusCode).to.equal(201);
                done()
              });
        });

        it("returns 400 if null entries are encountered", function(done){
            request(url_manager, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
            });
        });

        it("returns 409 if entry already exists", function(done){
            request(url_manager, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(409);
                done()
            });
        });

    });

    //user in registration
    describe("User", function(done){
        var url_user = "http://localhost:8000/register.html";
        it("should return status 201 as response when new user role signs up", function(done) {
            request(url_user, function(error, response, body) {
                expect(response.statusCode).to.equal(201);
                done()
              });
        });

        it("returns 400 if null entries are encountered", function(done){
            request(url_user, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
            });
        });

        it("returns 409 if entry already exists", function(done){
            request(url_user, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(409);
                done()
            });
        });

    });
 });

 // login page
 describe(" login registration", function(){

    
    var url = "https://localhost:8000/login.html";

    //admin in login
    describe("Admin", function(done){
        var url_admin = "";
        it("should return 200 as a response. admin signed in", function(done){
            request(url_admin, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done()
            });
        });
        it(" invalid credentials ", function(done) {
            request(url_admin, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
              });
        });
    });
    
    // organisation in login
    describe("Organisation", function(done){
        var url_org = "";
        it("should return 200 as a response. organisation signed in", function(done){
            request(url_org, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done()
            });
        });
        it(" invalid credentials ", function(done) {
            request(url_org, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
              });
        });
    });

    // manager in login
    describe("Manager", function(done){
        var url_manager = "";
        
        it("should return 200 as a response. manager signed in", function(done){
            request(url_manager, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done()
            });
        });
        it(" invalid credentials ", function(done) {
            request(url_manager, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
              });
        });

    });

    //user in login
    describe("User", function(done){
        var url_user = "";
        
        it("should return 200 as a response. user signed in", function(done){
            request(url_user, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done()
            });
        });
        it(" invalid credentials ", function(done) {
            request(url_user, function(error, response, body) {
                body = JSON.parse(body)
                expect(body.statusCode).to.equal(400);
                done()
              });
        });

    });
 });



