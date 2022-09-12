// importing libraried
const express = require("express");
const app = express();
require("dotenv").config();
var session = require('express-session');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: true}));

// sessions set-up
var sessionVar;
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret:process.env.Secret,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const ejs = require("ejs");
// const mongoose = require('mongoose');

// importing local packages
var userRouter = require("./controllers/users");
var adminRouter = require("./controllers/admin");


// database connectivity
var Connect = require("./mongoDB/connection");
Connect.dbconnect();

app.set('view engine', 'ejs');
app.use(express.static("public"));


// configuring routes
app.use("/",userRouter);
app.use("/admin",adminRouter);

// PORT
let port = process.env.PORT||3000;
app.listen(port, function() {
  console.log("<---------------Server started on PORt:"+port+"--------------->");
});

module.exports = app;
