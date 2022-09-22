import User from "../mongoDB/models/users.js";
import Place from "../mongoDB/models/places.js";
import bcrypt from "bcrypt"
import generateToken from "../utilities/generateToken.js";

export const registerUser = async (req,res)=>{
  try{
    const {email,password,mobile,role} = req.body;
    if(!(email,password)){
      res.status(400).send("Insufficent input");
    }
    const old = await User.findOne({email});
    if(old){
      res.status(409).send({msg:"User already exists",data:old});
    }
    else{
      let encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        mobile,
        password:encryptedPassword,
        role,
      })
      res.status(200).send(user);
    }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const loginUser = async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!(email,password)){
      res.status(400).send("Invalid credentials");
    }
      const user = await User.findOne({email});
      if(!user){
        res.status(400).send("No user found!")
      }else{
        if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user,email,user.role);
        user.token = token;
        res.status(200).send(user);
      }
  }
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
}

export const userProfile = async (req,res)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.status(400).send('No user found!');
    }else{
      res.status(200).send({data:user});
    }
  }catch(err){
    res.status(500).send("Some error occured!");
    console.log(err);
  }
};
