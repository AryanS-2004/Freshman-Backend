var express = require("express");
var bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var joke = "I hope your code behaves the same on Monday as it did on Friday.";


app.listen(3000, function(){
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
    res.render("cp", { jokeData : joke});
})
app.get("/dsa", function (req, res) {
    res.render("dsa", { jokeData : joke});
})
app.get("/dev", function (req, res) {
    res.render("dev", { jokeData : joke});
})

app.get("/reso", function (req, res) {
    res.render("reso", { joke : joke});
})




