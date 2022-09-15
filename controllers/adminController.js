import User from "../mongoDB/models/users.js"
import bcrypt from "bcrypt"
import generateToken from "../utilities/generateToken.js";

export const registerAdmin = async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!(email,password)){
      res.status(400).send("User already exists.");
    }
    const old = await User.findOne({email});
    if(old){
      res.status(409).send(old);
    }
    else{
      let encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password:encryptedPassword,
        role:'admin'
      })
      res.status(200).send(user);
    }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const loginAdmin = async (req,res)=>{
  try{
    const {email,password} = req.body;
    console.log(email,password)
    if(!(email,password)){
      res.status(400).send("Invalid credentials");
    }
      const user = await User.findOne({email});
      console.log(user)
      if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user,email);
      user.token = token;
      res.status(200).send(user);
    
  }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}
