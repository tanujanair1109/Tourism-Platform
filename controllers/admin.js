var express = require('express');

const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
  try{
    res.write("Welcome!\n");
    res.write("Admin panel....");
    res.end();
  }catch(err){
    console.log(err);
  }
});

module.exports = app;
