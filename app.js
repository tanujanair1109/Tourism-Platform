// importing libraried
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var createError = require('http-errors');

// importing local packages
var userRouter = require("./controllers/users");
var adminRouter = require("./controllers/admin");

// database connectivity
const url = "mongodb://localhost:27017/cgtourism";
mongoose.connect(url, {
    useNewUrlParser: true,
});
const con= mongoose.connection;

con.on('open', ()=> {
  console.log('<^^^Database Connected^^^>');
});

// configuring app
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// configuring routes
app.use("/",userRouter);
app.use("/admin",adminRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// PORT
let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("<---------------Server started on port 3000--------------->");
});

module.exports = app;
