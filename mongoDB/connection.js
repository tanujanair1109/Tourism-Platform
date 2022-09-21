var express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

function dbconnect(){
  // let url = process.env.MONGO_URL||"mongodb+srv://admin-tushar:testpassword@firstcluster.vc5uokn.mongodb.net/cgtourism";
  let url = process.env.MONGO_URL;
  mongoose.connect(url, {
      useNewUrlParser: true,
  });
  const con= mongoose.connection;

  con.on('open', ()=> {
    console.log('<^^^Database Connected^^^>');
  });
}

module.exports = {dbconnect};
