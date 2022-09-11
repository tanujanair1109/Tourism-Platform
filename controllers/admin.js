var express = require('express');

const User = require("../mongoDB/models/users");

const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.get("/", (req,res)=>{
  try{
    res.write("Welcome!\n");
    res.write("Admin panel....");
    res.end();
  }catch(err){
    console.log(err);
  }
});

app.post("/register",async (req,res)=>{
  try{
    const count = await User.estimatedDocumentCount()+1;
    const {email,password} = req.body;
    if(!(email,password)){
      res.status(400).json({status:400,message:"Insufficient input",success:false});
      res.redirect("/register");
    }
    const old = await User.findOne({email});
    console.log(old);
    if(old){
      res.status(409).json({status:409,message:"User already exists",success:false,data:old});
    }
    else{
      let encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        uid:'A'+count,
        email,
        password:encryptedPassword,
        role:'admin'
      })
      const token = jwt.sign(
        {user_id: user._id,email},
        process.env.TOKEN_KEY,
        {expiresIn:'2h'},
      );
      user.token = token;
      console.log(user);
      res.status(201).json({status:201,message:"Admin created",success:true,data:user});
    }
  }catch(err){
    console.log(err);
    res.status(500).json({status:500,message:"Internal server error",success:false,err:err});
  }
});

app.post('/login', async(req,res)=>{
  try{
    const {email,password} = req.body;
    if(!(email,password)){
      res.status(400).json({status:400,message:"Insufficient input",success:false});
      res.redirect("/login");
    }else{
      const user = await User.findOne({email});
      if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(200).json({status:200,message:"User logged-in",success:true,data:user});
    }
  }
  }catch(err){
    console.log(err);
    res.status(500).json({status:500,message:"Internal server error",success:false,err:err});
  }
})

module.exports = app;
