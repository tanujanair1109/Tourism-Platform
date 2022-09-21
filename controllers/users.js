var express = require('express');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

app.get("/", (req,res)=>{
  try{
    res.write("Greetings!\n");
    res.write("User panel....");
    res.end();
  }catch(err){
    console.log(err);
  }
});

module.exports = app;
