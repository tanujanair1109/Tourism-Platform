var express = require('express');

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
  try{
    res.send("Greeting USER!");
  }catch(err){
    console.log(err);
  }
});

module.exports = app;
