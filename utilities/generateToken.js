import express from 'express'
const app = express();
import jwt from 'jsonwebtoken'

function generateToken(obj,email,role){
  return jwt.sign(
  {obj_id: obj._id, email,role },
  process.env.TOKEN_KEY,
  {expiresIn:'2h'},
);
}

export default generateToken;
