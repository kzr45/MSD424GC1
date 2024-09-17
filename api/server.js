var express = require("express");
var cors = require("cors");

var app = express();

var concertAPI = require("./controllerAPI/API-controller"); // register the route

var bodyparser = require("body-parser");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/api1", concertAPI);//API location

app.listen(3060);

console.log("server up and running on port 3060");