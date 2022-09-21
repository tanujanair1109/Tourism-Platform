var express = require('express');
const app = express();
const jwt = require("jsonwebtoken");

function SIGN(obj,field){
  return jwt.sign(
  {obj_id: obj._id, field},
  process.env.TOKEN_KEY,
  {expiresIn:'2h'},
);
}

module.exports = {SIGN};
