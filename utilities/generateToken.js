import express from 'express'
const app = express();
import jwt from 'jsonwebtoken'

function generateToken(obj,field){
  return jwt.sign(
  {obj_id: obj._id, field},
  process.env.TOKEN_KEY,
  {expiresIn:'2h'},
);
}

export default generateToken;
