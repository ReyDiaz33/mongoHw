var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var express = require("express");
var app = express();

// setting up logger
app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.static(process.cwd() + "/public"));

var exphbs = require ("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"})
);
app.set("view engine", "handlebars");

// mongoose connection
mongoose.connect("mongodb://localhost/scraped_news");
var db = mongoose.connection;
// error message or successfully connected to mongoose
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("Connected to Mongoose!"); 
});

// set up PORT for 3000
var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Listening on PORT " + port);
});