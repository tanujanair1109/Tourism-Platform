
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

const  dbconnect = () =>{
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

export default dbconnect;
