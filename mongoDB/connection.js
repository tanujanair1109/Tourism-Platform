var express = require('express');
const mongoose = require("mongoose");

const app = express();

function dbconnect(){
  let url = process.env.MONGO_URL||"mongodb://localhost:27017/cgtourism";
  mongoose.connect(url, {
      useNewUrlParser: true,
  });
  const con= mongoose.connection;

  con.on('open', ()=> {
    console.log('<^^^Database Connected^^^>');
  });
}

module.exports = {dbconnect};
