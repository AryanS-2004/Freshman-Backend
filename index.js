var express = require("express");
var https = require("https");
var bodyParser = require("body-parser")
var fs = require("fs");
var request = require("request");
require("dotenv").config();

var app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');

var joke = "I hope your code behaves the same on Monday as it did on Friday.";


app.listen(process.env.PORT || 3000, function(){
    console.log("The server is successfully started at port 3000.");
})
app.get("/", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            joke = jokeData.joke;
        })
    })
    res.render("index", { jokeData : joke});
})
app.get("/cp", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            joke = jokeData.joke;
        })
    })
    res.render("cp", { jokeData : joke});
})
app.get("/dsa", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            joke = jokeData.joke;
        })
    })
    res.render("dsa", { jokeData : joke});
})
app.get("/dev", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            joke = jokeData.joke;
        })
    })
    res.render("dev", { jokeData : joke});
})

app.get("/reso", function (req, res) {
    const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const jokeData = JSON.parse(data);
            joke = jokeData.joke;
        })
    })
    res.render("reso", { jokeData : joke});
})

app.get("/signup", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/4618cc18a5";

    const options = {
        method: "POST",
        auth : "aryan:"+process.env.API_KEY
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {    
            res.sendFile(__dirname + "/faliure.html")
        }

        response.on("data", function (data) {
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/success", function (req, res) {
    res.redirect("/")
})
app.post("/faliure", function (req, res) {
    res.redirect("/signup")
})




